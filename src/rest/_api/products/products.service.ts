import { Inject, Injectable } from '@nestjs/common'
import { CONTENT_FIELDS_REPOSITORY, IContentFieldRepository } from 'src/domain/content/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	PRODUCTS_REPOSITORY,
	IProductsRepository,
	ProductStatus,
	IProductsCategoriesRepository,
	PRODUCT_CATEGORIES_REPOSITORY,
} from 'src/domain/products/typing'
import {
	IPagination,
	Lang,
	NotFoundException,
	getTranslate,
	paginateAndGetMany,
	prepareSearchString,
} from 'src/shared'
import { GetProductsCategoriesParamsDto, GetProductsParamsDto } from './dto'
import { Brackets } from 'typeorm'
import { transformFileUrl } from 'src/shared/transforms'
import { prepareContent } from 'src/domain/content/helpers'

@Injectable()
export class ApiProductsService {
	constructor(
		@Inject(PRODUCTS_REPOSITORY)
		private readonly productsRepository: IProductsRepository,

		@Inject(CONTENT_FIELDS_REPOSITORY)
		private readonly contentFieldsRepository: IContentFieldRepository,

		@Inject(PRODUCT_CATEGORIES_REPOSITORY)
		private readonly productCategoriesRepository: IProductsCategoriesRepository,
	) {}

	public async getList(pagination: IPagination, params: GetProductsParamsDto) {
		const query = this.productsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.previewMedia', 'previewMedia')
			.where('it.status = :status', { status: ProductStatus.Active })

		if (params.categoryKey) {
			const category = await this.productCategoriesRepository.findOneBy({
				key: params.categoryKey,
			})

			const childCategories = await this.productCategoriesRepository
				.createQueryBuilder('it')
				.where('(it.path) @> ARRAY[:id]::numeric[]', { id: Number(category.id) })
				.getMany()

			const categoriesIds = [category.id]

			if (Array.isArray(childCategories))
				categoriesIds.push(...childCategories.map(it => it.id))

			console.log('categoriesIds', childCategories)
			query.andWhere('(it.categoriesIds)::text[] && ARRAY[:...categoriesIds]', {
				categoriesIds,
			})
		}

		if (params.withDiscount) {
			query.andWhere('it.discount > 0')
		} else {
			query.andWhere('it.price > 0')
		}

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('translations.name ILIKE :st', {
						st: prepareSearchString(pagination.searchString),
					})
				}),
			)
		}

		const { items, count }: any = await paginateAndGetMany(query, pagination, 'it')

		for await (const [index, it] of items.entries()) {
			const content = await this.contentFieldsRepository.find({
				where: {
					parentId: it.id,
					parentTable: 'products',
				},
			})
			items[index].content = prepareContent(content, Lang.uk)
			if (it.previewMedia)
				items[index].previewMedia.url = transformFileUrl(it.previewMedia.url)
			items[index].translate = getTranslate(it.translations, Lang.uk)
			items[index].inStock = Boolean(it.countInStock)
			delete items[index].translations
		}

		return {
			items,
			count,
		}
	}

	public async getCategories(dto: GetProductsCategoriesParamsDto) {
		const query = this.productCategoriesRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')

		if (dto.parentKey) {
			const category = await this.productCategoriesRepository.findOneBy({
				key: dto.parentKey,
			})
			if (!category) throw new NotFoundException()
			query.where('it.parentId = :parentId', { parentId: category.id })
		} else {
			query.where('it.parentId IS NULL')
		}

		const items = await query.getMany()

		items.forEach((it, i, arr) => {
			arr[i].translate = getTranslate(it.translations, Lang.uk)
			arr[i].translations = null
		})

		return items
	}
}
