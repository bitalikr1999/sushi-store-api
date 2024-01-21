import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { RestPublicOrdersService } from './orders.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateOrderPayloadDto } from './dto'
import { IRequestUser } from 'src/domain/sessions/typing'
import { ReqUserData } from 'src/domain/sessions/decorators'

@ApiTags('API | Orders')
@Controller('/api/orders')
export class RestPublicOrdersController {
	constructor(private readonly service: RestPublicOrdersService) {}

	@ApiOperation({ summary: 'Create order' })
	@ApiResponse({
		status: 201,
	})
	@Post('')
	public put(@Body() dto: CreateOrderPayloadDto, @ReqUserData() userData: IRequestUser) {
		return this.service.create(dto, userData)
	}

	@ApiOperation({ summary: 'Get order' })
	@ApiResponse({
		status: 201,
	})
	@Get(':orderId')
	public get(@Param('orderId') orderId: number) {
		return this.service.getOrderInfo(orderId)
	}
}
