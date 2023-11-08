import { Currency, Lang } from 'src/shared'
import { ProductStatus } from '../enums'
import { IMedia } from 'src/domain/media/typing'
import { IProductVariant } from './products-variants.interface'

export interface IProductTranslation {
	id?: number
	name: string
	description?: string
	productId?: number
	lang: Lang
}

export interface IProduct {
	id: number

	code?: string
	key: string
	countInStock: number

	price: number
	currency: Currency
	status: ProductStatus
	discount?: number

	previewMediaId?: number
	categoriesIds?: number[]

	translations?: IProductTranslation[]

	createdAt: string
	updatedAt: string

	previewMedia?: IMedia
	translate?: IProductTranslation
	variants?: IProductVariant[]
	isFavorite?: boolean
	inStock?: boolean
	content?: any
}
