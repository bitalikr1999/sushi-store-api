import { OrderPaymentMethod, OrderStatus } from '../enums'
import { Currency, DtoProperty, DtoPropertyOptional } from 'src/shared'
import { IProduct, IProductVariant } from 'src/domain/products/typing'

export class OrderProductDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	orderId: number

	@DtoProperty()
	productId: number

	@DtoPropertyOptional()
	productVariantId?: number

	@DtoProperty()
	price: number

	@DtoProperty()
	count: number

	@DtoProperty()
	discount: number

	@DtoProperty()
	product?: IProduct

	@DtoProperty()
	productVariant?: IProductVariant

	@DtoProperty()
	brutoAmount: number

	@DtoProperty()
	nettoAmount: number

	@DtoProperty()
	discountAmount: number

	@DtoProperty()
	discountPercent: number
}

export class OrderDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	status: OrderStatus

	@DtoProperty()
	currency: Currency

	@DtoProperty()
	paymentMethod: OrderPaymentMethod

	@DtoPropertyOptional()
	comment?: string

	@DtoProperty()
	orderUserId: number

	@DtoProperty({ isArray: true, type: OrderProductDto })
	orderProducts?: OrderProductDto[]

	@DtoPropertyOptional()
	shippingId?: number

	@DtoProperty()
	shipping?: any

	@DtoProperty()
	createdAt?: string

	@DtoProperty()
	updatedAt?: string

	@DtoProperty()
	brutoAmount: number

	@DtoProperty()
	nettoAmount: number

	@DtoProperty()
	discountAmount: number

	@DtoProperty()
	discountPercent: number
}
