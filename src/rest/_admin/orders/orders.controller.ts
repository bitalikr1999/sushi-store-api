import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminOrdersService } from './orders.service'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { GetOrdersParamsDto, UpdateOrderStatusPayloadDto } from './dto'

@ApiTags('ADMIN | Orders')
@Controller('admin/orders')
export class RestAdminOrdersController {
	constructor(private readonly service: RestAdminOrdersService) {}

	@ApiOperation({ summary: 'Get products list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination, @Query() dto: GetOrdersParamsDto) {
		return this.service.getList(pagination, dto)
	}

	@ApiOperation({ summary: 'Update product status' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Patch(':id/status')
	public updateStatus(@Param('id') id: number, @Body() dto: UpdateOrderStatusPayloadDto) {
		return this.service.updateStatus(id, dto.status)
	}

	@ApiOperation({ summary: 'Get order' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get(':id')
	public getOne(@Param('id') id: number) {
		return this.service.getOne(id)
	}
}
