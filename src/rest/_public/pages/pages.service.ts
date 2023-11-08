import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { prepareContent } from 'src/domain/content/helpers'
import {
	CONTENT_FIELDS_REPOSITORY,
	CONTENT_SERVICE,
	IContentFieldRepository,
	IContentService,
} from 'src/domain/content/typing'
import { FAVORITIES_SERVICE } from 'src/domain/favorities/typing/consts'
import { IFavoritiesService } from 'src/domain/favorities/typing/interfaces'
import { IPagesRepository } from 'src/domain/pages/typing'
import { PAGES_REPOSITORY } from 'src/domain/pages/typing/consts'
import { IProductsRepository, PRODUCTS_REPOSITORY, ProductStatus } from 'src/domain/products/typing'
import { IRequestUser } from 'src/domain/sessions/typing'
import { IInstagramService, INSTAGRAM_SERVICES } from 'src/libs/instagram/typing'
import { IPagination, Lang, PublicService, paginateAndGetMany } from 'src/shared'
import { getTranslate } from 'src/shared/helpers/translations.helpers'
import { transformFileUrl } from 'src/shared/transforms'

@Injectable()
export class PublicPagesService extends PublicService {
	@Inject(PAGES_REPOSITORY)
	private pagesRepository: IPagesRepository

	@Inject(CONTENT_FIELDS_REPOSITORY)
	private readonly contentFieldsRepository: IContentFieldRepository

	@Inject(FAVORITIES_SERVICE)
	private readonly favoritiesService: IFavoritiesService

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(CONTENT_SERVICE)
	private readonly contentService: IContentService

	@Inject(INSTAGRAM_SERVICES) private readonly instagramService: IInstagramService

	public async getHome(userData: IRequestUser) {
		let instagramPosts = await this.instagramService.getInstagramPhotos(7)

		const commonData = await this.getCommonData(userData.userId)
		const productsData = await this.getProductsNews(
			{
				limit: 6,
				page: 1,
			},
			userData.fixedUserId,
		)

		const page = await this.pagesRepository.findOneBy({ key: 'home' })

		const content = await this.contentService.loadOne({
			parentId: page.id,
			parentTable: 'pages',
			lang: Lang.uk,
		})

		const categories: Record<string, any> = {}

		content?.categories.map((it, i) => {
			categories[i] = it
		})

		try {
			if (!instagramPosts) {
				instagramPosts = content.instagramPhotos.map(it => {
					return {
						permalink: it.link,
						media_url: it.image,
					}
				})
			}
		} catch (e) {}

		return {
			...commonData,
			...productsData,
			content,
			categories,
			instagramPosts,
		}
	}

	public async getPage(key: string, lang: Lang, userData: IRequestUser) {
		const commonData = await this.getCommonData(userData.userId)

		const page = await this.pagesRepository.findOne({
			where: { key },
			relations: ['translations'],
		})
		if (!page) throw new NotFoundException()

		const content = await this.contentFieldsRepository.find({
			where: {
				parentId: page.id,
				parentTable: 'pages',
			},
		})

		const translate = getTranslate(page.translations, lang)

		return {
			...page,
			translate,
			content: prepareContent(content, lang),
			...commonData,
		}
	}

	public async getProductsNews(pagination: IPagination, fixedUserId: string) {
		const newsProducts = await this.productsRepository
			.createQueryBuilder('it')
			.select('it.id', 'id')
			.where('it.status = :status', { status: ProductStatus.Active })
			.orderBy('it.createdAt', 'DESC')
			.limit(20)
			.getRawMany()

		const ids = newsProducts.map(it => it.id)

		const query = this.productsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.previewMedia', 'previewMedia')
			.where('it.id = ANY(:ids)', { ids })
			.orderBy('it.createdAt', 'DESC')

		delete pagination.sort
		delete pagination.sortField

		const { items } = await paginateAndGetMany(query, pagination, 'it')
		const favoritiesIds = await this.favoritiesService.getIds(fixedUserId)

		items.map((it, i, arr) => {
			arr[i].previewMedia.url = transformFileUrl(it?.previewMedia?.url)
			arr[i].translate = getTranslate(it.translations, Lang.uk)
			arr[i].isFavorite = favoritiesIds.includes(it.id)
			delete arr[i].translations
		})

		return {
			products: items,
		}
	}
}
