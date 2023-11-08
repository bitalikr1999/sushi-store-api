import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminFormRequestsService } from './form-requests.service'
import { GetFormRequestsParamsDto, UpdateStatusFormRequestPayloadDto } from './dto'
import { IPagination, ReqPagination, ReqUser } from 'src/shared'
import { AuthGuard } from 'src/domain/sessions/decorators'

@ApiTags('ADMIN | Form requests')
@Controller('admin/form-requests')
export class RestAdminFormRequestsController {
	constructor(private readonly service: RestAdminFormRequestsService) {}

	@ApiOperation({ summary: 'Get form requests' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Get('')
	public get(
		@ReqUser() userId: number,
		@ReqPagination() pagination: IPagination,
		@Query() dto: GetFormRequestsParamsDto,
	) {
		return this.service.get(userId, pagination, dto)
	}

	@ApiOperation({ summary: 'Update status' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Patch(':id')
	public put(
		@ReqUser() userId: number,
		@Param('id') id: number,
		@Body() dto: UpdateStatusFormRequestPayloadDto,
	) {
		return this.service.updateStatus(userId, id, dto)
	}

	@ApiOperation({ summary: 'Get new requests count' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Get('new-count')
	public getCount() {
		return this.service.getNewCount()
	}

	@ApiOperation({ summary: 'Get details' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Get(':id')
	public getOne(@Param('id') id: number) {
		return this.service.getDetails(id)
	}
}
