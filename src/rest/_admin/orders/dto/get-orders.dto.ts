import { OrderStatus } from 'src/domain/orders/typing'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class GetOrdersParamsDto {
	@DtoPropertyOptional()
	status?: OrderStatus
}
