import { Currency } from 'src/shared'
import { OrderPaymentMethod, OrderStatus } from '../enums'
import { IShipping } from 'src/domain/shippings/typing'
import { IProduct, IProductVariant } from 'src/domain/products/typing'

export interface IOrderUser {
	id: number
	email?: string
	phoneNumber: string
	name: string
	userId?: number

	fixedUserId?: string
}

export interface IOrderProduct {
	id: number

	orderId: number
	productId: number
	productVariantId?: number

	price: number
	count: number
	discount: number

	product?: IProduct
	productVariant?: IProductVariant
}

export interface IOrder {
	id: number

	status: OrderStatus
	currency: Currency
	paymentMethod: OrderPaymentMethod

	comment?: string

	orderUserId: number
	orderUser?: IOrderUser

	usedBonuses?: number

	orderProducts?: IOrderProduct[]

	shippingId?: number
	shipping?: IShipping

	createdAt?: string
	updatedAt?: string

	options?: any
}
