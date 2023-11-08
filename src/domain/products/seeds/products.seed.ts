import { Inject, Injectable } from '@nestjs/common'
import { Currency, Lang, Seeder } from 'src/shared'
import {
	CreateProductPayload,
	IProductsCategoriesRepository,
	IProductsRepository,
	IProductsService,
	PRODUCTS_REPOSITORY,
	PRODUCTS_SERVICE,
	PRODUCT_CATEGORIES_REPOSITORY,
} from '../typing'

import { faker } from '@faker-js/faker'
import { ProductStatus } from '../typing/enums'
import { CONTENT_SERVICE, IContentService } from 'src/domain/content/typing'
import { baseProductTemplate } from 'src/config/templates/products.templates'

@Injectable()
export class ProductsSeed extends Seeder {
	@Inject(PRODUCTS_SERVICE)
	private productsService: IProductsService

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private productCategoriesRepository: IProductsCategoriesRepository

	@Inject(CONTENT_SERVICE)
	private contentService: IContentService

	protected MAX_COUNT = 100
	protected SEED_COUNT = 2
	protected PREVIEW_MEDIA_ID = 22
	protected name = 'Products'

	protected async seed() {
		if (!(await this.checkIsNeedToSeed())) return

		const category = await this.productCategoriesRepository.findOne({
			where: { key: 'footwear' },
		})
		for (let index = 0; index < this.SEED_COUNT; index++) {
			await this.createProduct([category.id])
		}
	}

	protected async checkIsNeedToSeed() {
		const count = await this.productsRepository.count()
		return count <= this.MAX_COUNT
	}

	protected async createProduct(categoriesIds: number[]) {
		const data: CreateProductPayload = {
			price: Number(faker.commerce.price()),
			currency: Currency.UAH,
			status: ProductStatus.Active,
			categoriesIds: categoriesIds,
			previewMediaId: this.PREVIEW_MEDIA_ID,
			translations: [
				{
					lang: Lang.uk,
					name: faker.commerce.productName(),
				},
			],
		}
		const product = await this.productsService.create(data)

		await Promise.all(
			baseProductTemplate.map(async it => {
				await this.contentService.put({
					parentId: product.id,
					parentTable: 'products',
					key: it.key,
					content: {
						key: it.key,
						type: it.type,
						label: it.label,
						disabledTranslates: true,
						value: faker.commerce.productMaterial(),
					},
				})
			}),
		)
	}
}
