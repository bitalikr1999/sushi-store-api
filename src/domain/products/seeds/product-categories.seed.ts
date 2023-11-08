import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { IProductCategoriesService, PRODUCT_CATEGORIES_SERVICE } from '../typing'
import { PRODUCTS_CATEGORIES_SEED_DATA } from 'src/config/seeds'

@Injectable()
export class ProductsCategoriesSeed extends Seeder {
	protected name = 'Products categories'

	@Inject(PRODUCT_CATEGORIES_SERVICE) productsCategoriesService: IProductCategoriesService

	constructor() {
		super()
	}
	protected async seed(): Promise<void> {
		await Promise.all(
			PRODUCTS_CATEGORIES_SEED_DATA.map(async item => {
				try {
					await this.productsCategoriesService.create(item)
				} catch (e) {}
			}),
		)
	}
}
