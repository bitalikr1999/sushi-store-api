import { OrderStatus } from 'src/domain/orders/typing'
import { DtoProperty } from 'src/shared'

export class UpdateOrderStatusPayloadDto {
	@DtoProperty({ enum: OrderStatus })
	status: OrderStatus
}
