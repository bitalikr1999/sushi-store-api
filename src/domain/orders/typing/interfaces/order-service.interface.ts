import { Currency } from 'src/shared'
import { IOrder } from './order.interface'
import { OrderDto } from '../dto'

export interface IOrderService {
	create(payload: CreateOrderPayload): Promise<IOrder>
	prepareOrder(order: IOrder): Promise<OrderDto>
}

export interface CreateOrderPayload {
	currency: Currency

	usedBonuses?: number
	user: {
		email?: string
		phoneNumber: string
		name: string
		userId?: number
		fixedUserId?: string
	}

	products: {
		productId: number
		count: number
		discount: number
		productVariantId?: number
	}[]

	shippingId: number
	comment?: string
}
