import { Type } from 'class-transformer'
import { OrderPaymentMethod } from 'src/domain/orders/typing'
import { ShippingType } from 'src/domain/shippings/typing'
import { Currency, DtoProperty, DtoPropertyOptional } from 'src/shared'

class UserDto {
	@DtoPropertyOptional()
	email?: string

	@DtoProperty()
	phoneNumber: string

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	userId?: number

	fixedUserId?: string
}

class ProductDto {
	@DtoProperty()
	productId: number

	@DtoProperty()
	count: number

	@DtoPropertyOptional()
	productVariantId?: number
}

export class OrderShippingPayloadDto {
	@DtoPropertyOptional()
	countryCode?: string

	@DtoPropertyOptional()
	addressLine?: string

	@DtoProperty({ enum: ShippingType })
	type: ShippingType

	@DtoPropertyOptional()
	novaPoshtaData: {
		region?: string
		town?: string
		departmentName?: string
		departmentCode?: string
		novaPoshtaDataDepartmentRef?: string
	}

	@DtoPropertyOptional()
	ukrPoshtaData: {
		town: string
		departmentAddress: string
	}
}

export class CreateOrderPayloadDto {
	@DtoProperty({ type: UserDto })
	@Type(() => UserDto)
	user: UserDto

	@DtoProperty({ type: ProductDto, isArray: true })
	@Type(() => ProductDto)
	products: ProductDto[]

	@DtoProperty()
	shipping: OrderShippingPayloadDto

	@DtoPropertyOptional()
	comment?: string

	@DtoPropertyOptional()
	usedBonuses?: number

	@DtoPropertyOptional()
	deliveryToTime?: string
}
