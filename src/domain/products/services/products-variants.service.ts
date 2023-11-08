import { Inject, Injectable } from '@nestjs/common'
import {
	IProductsVariantsRepository,
	IProductsVariantsService,
	IPutProductVariantPayload,
	PRODUCTS_VARIANTS_REPOSITORY,
} from '../typing'
import { difference, isNil } from 'lodash'

@Injectable()
export class ProductsVariantsService implements IProductsVariantsService {
	@Inject(PRODUCTS_VARIANTS_REPOSITORY)
	private readonly productsVariantsRepository: IProductsVariantsRepository

	public async put(productId: number, items: IPutProductVariantPayload[]): Promise<void> {
		const existVarians = await this.productsVariantsRepository.findBy({ productId })

		await Promise.all(
			items.map(async item => {
				if (!item.id) {
					await this.productsVariantsRepository.insert({ ...item, productId })
				} else
					await this.productsVariantsRepository.update(item.id, {
						name: item.name,
						description: item.description,
						previewMediaId: item.previewMediaId,
					})
			}),
		)

		const existIds = existVarians.map(it => it.id)
		const inputIds = items.map(it => it.id).filter(Boolean)
		const toRemoveIds = difference(existIds, inputIds)
		if (toRemoveIds.length) await this.productsVariantsRepository.delete(toRemoveIds)
	}
}
