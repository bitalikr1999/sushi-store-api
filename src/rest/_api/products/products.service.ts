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
	getTranslate,
	paginateAndGetMany,
	prepareSearchString,
} from 'src/shared'
import { GetProductsParamsDto } from './dto'
import { Brackets } from 'typeorm'
import { transformFileUrl } from 'src/shared/transforms'
import { prepareContent } from 'src/domain/content/helpers'

@Injectable()
export class ApiProductsService {
	constructor(
		@Inject(PRODUCTS_REPOSITORY)
		private readonly productsRepository: IProductsRepository,

		@Inject(GALLERY_SERVICE)
		private readonly galleryService: IGalleryService,

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

			query.andWhere('(it.categoriesIds)::text[] @> ARRAY[:...categoriesIds]', {
				categoriesIds: [category.id],
			})
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
		console.log(items)

		return {
			items,
			count,
		}
	}
}
