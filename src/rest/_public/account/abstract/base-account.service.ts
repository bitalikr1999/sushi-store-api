import { Inject, NotFoundException } from '@nestjs/common'
import { isEmpty } from 'lodash'
import { IUsersService, USERS_SERVICE } from 'src/domain/users/typing'
import {
	IPagination,
	Lang,
	PublicService,
	getTranslate,
	paginateAndGetMany,
	prepareSearchString,
} from 'src/shared'
import { GetProductsPageParams } from '../../products/dto/get-product-page.dto'
import { IProductsRepository, PRODUCTS_REPOSITORY, ProductStatus } from 'src/domain/products/typing'
import { Brackets } from 'typeorm'
import { IFavoritiesService } from 'src/domain/favorities/typing/interfaces'
import { FAVORITIES_SERVICE } from 'src/domain/favorities/typing/consts'
import { transformFileUrl } from 'src/shared/transforms'

export abstract class BaseAccountService extends PublicService {
	@Inject(USERS_SERVICE)
	protected userService: IUsersService

	@Inject(PRODUCTS_REPOSITORY)
	protected readonly productsRepository: IProductsRepository

	@Inject(FAVORITIES_SERVICE)
	protected readonly favoritiesService: IFavoritiesService

	public async getAccountCommonData(userId?: number) {
		const commonData = await this.getCommonData(userId)

		const account = await this.userService.getOneBy({ id: userId })
		if (isEmpty(account)) throw new NotFoundException('user not found')

		const discountProducts = await this.getProducts(
			{
				withDiscount: true,
			},
			{
				limit: 6,
				page: 1,
			},
		)

		return {
			...commonData,
			account,
			discountProducts: discountProducts.items,
			showSpecialProposal: discountProducts.count > 3,
		}
	}

	protected async getProducts(
		params: GetProductsPageParams,
		pagination: IPagination,
		ids?: number[],
	) {
		const query = this.productsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.previewMedia', 'previewMedia')
			.where('it.status = :status', { status: ProductStatus.Active })

		if (Array.isArray(ids)) {
			query.andWhere('it.id = ANY(:ids)', { ids })
		}

		if (params.withDiscount) {
			query.andWhere('it.discount > 0')
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
		let favoritiesIds = []

		try {
			if (params.fixedUserId)
				favoritiesIds = await this.favoritiesService.getIds(params.fixedUserId)
		} catch (e) {}

		items.map((it, i, arr) => {
			arr[i].previewMediaUrl = transformFileUrl(it.previewMedia.url)
			arr[i].price = it.price?.toLocaleString()
			arr[i].translate = getTranslate(it.translations, Lang.uk)
			arr[i].isFavorite = favoritiesIds.includes(it.id)
			arr[i].inStock = Boolean(it.countInStock)
			arr[i].link = `/products/single/${it.key}`
			delete arr[i].translations
		})

		return { items, count }
	}
}
