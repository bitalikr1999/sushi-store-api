import { Inject, Injectable } from '@nestjs/common'
import {
	IProductCategoriesService,
	IProductsCategoriesRepository,
	IProductsRepository,
	PRODUCTS_REPOSITORY,
	PRODUCT_CATEGORIES_REPOSITORY,
	PRODUCT_CATEGORIES_SERVICE,
} from 'src/domain/products/typing'
import {
	IPagination,
	Lang,
	PublicService,
	generatePaginationResult,
	paginateAndGetMany,
	prepareSearchString,
} from 'src/shared'
import { getTranslate } from 'src/shared/helpers/translations.helpers'
import { GetProductsPageParams } from './dto/get-product-page.dto'
import { transformFileUrl } from 'src/shared/transforms'
import { Brackets } from 'typeorm'
import { ProductStatus } from 'src/domain/products/typing/enums'
import { defaultTo, isEmpty } from 'lodash'
import * as numeral from 'numeral'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { CONTENT_FIELDS_REPOSITORY, IContentFieldRepository } from 'src/domain/content/typing'
import { prepareContent } from 'src/domain/content/helpers'
import { FAVORITIES_SERVICE } from 'src/domain/favorities/typing/consts'
import { IFavoritiesService } from 'src/domain/favorities/typing/interfaces'
import { IRequestUser } from 'src/domain/sessions/typing'

@Injectable()
export class PublicProductsService extends PublicService {
	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productCategoriesRepository: IProductsCategoriesRepository

	@Inject(PRODUCT_CATEGORIES_SERVICE)
	private readonly productCategoriesService: IProductCategoriesService

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(GALLERY_SERVICE)
	private readonly galleryService: IGalleryService

	@Inject(CONTENT_FIELDS_REPOSITORY)
	private readonly contentFieldsRepository: IContentFieldRepository

	@Inject(FAVORITIES_SERVICE)
	private readonly favoritiesService: IFavoritiesService

	public async getProductsCommonPage(
		params: GetProductsPageParams,
		pagination: IPagination,
		userData: IRequestUser,
	) {
		const commonData = await this.getCommonData(userData?.userId)
		const products = await this.getProducts(params, pagination)

		const categories = await this.getCategories()

		return {
			...commonData,
			products: products.items,
			categories,
			pagination: generatePaginationResult(pagination, '/products', products.count, {}),
			isEmpty: !Boolean(products.count),
			params: this.prepareParams(params, products.minMax.min, products.minMax.max),
		}
	}

	public async getProductsDiscountPage(
		params: GetProductsPageParams,
		pagination: IPagination,
		userData: IRequestUser,
	) {
		const commonData = await this.getCommonData(userData?.userId)

		params.withDiscount = true

		const products = await this.getProducts(params, pagination)

		const categories = await this.getCategories()

		return {
			...commonData,
			products: products.items,
			categories,
			pagination: generatePaginationResult(
				pagination,
				'/products/discounts',
				products.count,
				{},
			),
			isEmpty: !Boolean(products.count),
			params: this.prepareParams(params, products.minMax.min, products.minMax.max),
		}
	}

	public async getProductsPageData(
		categoryKey: string,
		params: GetProductsPageParams,
		pagination: IPagination,
		userData: IRequestUser,
	) {
		const commonData = await this.getCommonData(userData?.userId)
		const category = await this.productCategoriesRepository.findOne({
			where: { key: categoryKey },
			relations: ['translations'],
		})

		const categoryTranslate = getTranslate(category.translations, Lang.uk)
		const products = await this.getProducts(params, pagination, [category.id])
		const subCategories = await this.getCategories(category.id)

		return {
			...commonData,
			category: {
				key: categoryKey,
				name: categoryTranslate.name,
				description: categoryTranslate.description,
			},
			products: products.items,
			subCategories,
			pagination: generatePaginationResult(
				pagination,
				`/products/${categoryKey}`,
				products.count,
				{},
			),
			show: null,
			params: this.prepareParams(params, products.minMax.min, products.minMax.max),
			isEmpty: !Boolean(products.count),
		}
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

	private async getCategories(parentId?: number) {
		const query = this.productCategoriesRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')

		if (parentId) query.where('it.parentId = :parentId', { parentId })

		const categories = await query.getMany()
		categories.map((it, i, arr) => {
			arr[i].translate = getTranslate(it.translations, Lang.uk)
		})

		return categories
	}

	private prepareParams(params: GetProductsPageParams, min: number, max: number) {
		const priceFrom = defaultTo(params.priceFrom, min)
		const priceTo = defaultTo(params.priceTo, max)
		return {
			...params,
			priceFromLabel: numeral(priceFrom).format('0 0'),
			priceToLabel: numeral(priceTo).format('0 0'),
			priceFrom,
			priceTo,
			min,
			max,
		}
	}

	public async getProduct(key: string, userData: IRequestUser) {
		const commonData = await this.getCommonData(userData?.userId)
		const product = await this.productsRepository
			.createQueryBuilder('it')
			.where('it.key = :key', { key })
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.previewMedia', 'previewMedia')
			.leftJoinAndSelect('it.variants', 'variants')
			.getOne()

		product.previewMedia.path = transformFileUrl(product.previewMedia.url)
		const translate = getTranslate(product.translations, Lang.uk)
		const gallery = await this.galleryService.get({
			parentId: product.id,
			parentTable: 'products',
		})

		gallery.unshift({
			id: 0,
			createdAt: null,
			fileUrl: product.previewMedia.path,
			mediaId: product.previewMediaId,
			order: 0,
		})

		const content = await this.contentFieldsRepository.find({
			where: {
				parentId: product.id,
				parentTable: 'products',
			},
		})

		const category = await this.productCategoriesService.getHighRoot(product.categoriesIds[0])

		category.translate = getTranslate(category.translations, Lang.uk)

		const favoritiesIds = await this.favoritiesService.getIds(userData.fixedUserId)

		return {
			...commonData,
			product,
			translate,
			gallery,
			category,
			content: prepareContent(content, Lang.uk),
			variants: defaultTo(product.variants, []),
			isFavorite: favoritiesIds.includes(product.id),
			inStock: Boolean(product.countInStock),
		}
	}

	public async getProductsNews(pagination: IPagination, userData: IRequestUser) {
		const commonData = await this.getCommonData(userData?.userId)
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

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')
		const favoritiesIds = await this.favoritiesService.getIds(userData.fixedUserId)

		items.map((it, i, arr) => {
			arr[i].previewMedia.url = transformFileUrl(it.previewMedia.url)
			arr[i].translate = getTranslate(it.translations, Lang.uk)
			arr[i].isFavorite = favoritiesIds.includes(it.id)
			delete arr[i].translations
		})

		return {
			...commonData,
			products: items,
			pagination: generatePaginationResult(pagination, `/products/news`, count, {}),
			isEmpty: !Boolean(count),
		}
	}

	public async getFavorities(
		fixedUserId: string,
		pagination: IPagination,
		userData: IRequestUser,
	) {
		const commonData = await this.getCommonData(userData.userId)
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
			...commonData,
			products: products.items,
			pagination: generatePaginationResult(
				pagination,
				`/products/favorities`,
				products.count,
				{},
			),
			show: null,
			params: this.prepareParams({}, products.minMax.min, products.minMax.max),
			isEmpty: !Boolean(products.count),
			isFavoritiesPage: true,
		}
	}
}
