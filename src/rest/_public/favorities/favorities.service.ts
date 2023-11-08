import { Inject, Injectable } from '@nestjs/common'
import { FAVORITIES_SERVICE } from 'src/domain/favorities/typing/consts'
import { IFavoritiesService } from 'src/domain/favorities/typing/interfaces'
import { AddFavoritePayloadDto } from './dto'
import {
	IPagination,
	Lang,
	PublicService,
	generatePaginationResult,
	getTranslate,
	paginateAndGetMany,
	prepareSearchString,
} from 'src/shared'
import { IProductsRepository, PRODUCTS_REPOSITORY, ProductStatus } from 'src/domain/products/typing'
import { transformFileUrl } from 'src/shared/transforms'
import { GetProductsPageParams } from '../products/dto/get-product-page.dto'
import { isEmpty } from 'lodash'
import { Brackets } from 'typeorm'

@Injectable()
export class PublicFavoritiesService extends PublicService {
	@Inject(FAVORITIES_SERVICE)
	private readonly favoritiesService: IFavoritiesService
	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	public async toggle(ownerId: string, payload: AddFavoritePayloadDto) {
		return await this.favoritiesService.toggle({
			ownerId,
			productId: payload.productId,
		})
	}

	public async getIds(ownerId: string) {
		return await this.favoritiesService.getIds(ownerId)
	}

	public async getProducts(
		params: GetProductsPageParams,
		pagination: IPagination,
		categoriesIds?: number[],
		ids?: number[],
	) {
		const query = this.productsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.previewMedia', 'previewMedia')
			.where('it.status = :status', { status: ProductStatus.Active })

		if (!isEmpty(categoriesIds)) {
			query.andWhere('(it.categoriesIds)::text[] @> ARRAY[:...categoriesIds]', {
				categoriesIds,
			})
		}

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

		const minMax = await query
			.clone()
			.select('MAX(it.price)', 'max')
			.addSelect('MIN(it.price)', 'min')
			.getRawOne()

		if (params.priceFrom) {
			query.andWhere('it.price >= :priceFrom', { priceFrom: params.priceFrom })
		}

		if (params.priceTo) {
			query.andWhere('it.price <= :priceTo', { priceTo: params.priceTo })
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')
		const favoritiesIds = await this.favoritiesService.getIds(params.fixedUserId)

		items.map((it, i, arr) => {
			arr[i].previewMedia.url = transformFileUrl(it.previewMedia.url)
			arr[i].translate = getTranslate(it.translations, Lang.uk)
			arr[i].isFavorite = favoritiesIds.includes(it.id)
			arr[i].inStock = Boolean(it.countInStock)
			delete arr[i].translations
		})

		return { items, count, minMax }
	}

	public async getFavorities(fixedUserId: string, pagination: IPagination) {
		const ids = await this.favoritiesService.getIds(fixedUserId)

		const products = await this.getProducts(
			{
				fixedUserId,
			},
			{
				limit: 100,
				page: 1,
			},
			null,
			ids,
		)

		return {
			products: products.items,
		}
	}
}
