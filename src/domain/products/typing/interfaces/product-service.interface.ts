import { Currency, Lang } from 'src/shared'
import { ProductStatus } from '../enums'
import { IProduct } from './product.interface'
import { IPutProductVariantPayload } from './products-variants.interface'

export interface IProductsService {
	create(payload: CreateProductPayload): Promise<IProduct>
	update(id: number, payload: Partial<CreateProductPayload>): Promise<IProduct>
	delete(id: number): Promise<void>
}

export interface CreateProductPayload {
	price: number
	currency: Currency
	status: ProductStatus
	discount?: number

	previewMediaId?: number
	categoriesIds?: number[]
	countInStock?: number

	translations?: {
		name: string
		description?: string
		lang: Lang
	}[]

	variants?: IPutProductVariantPayload[]
}
