import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminScheduleService } from './schedule.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { GetScheduleParamsDto, PutScheduleShiftPayloadDto } from './dto'

@ApiTags('ADMIN | Schedule')
@Controller('admin/schedule')
export class AdminScheduleController {
	constructor(private readonly service: RestAdminScheduleService) {}

	@ApiOperation({ summary: 'Put schedule shift' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Put()
	public async create(@Body() dto: PutScheduleShiftPayloadDto) {
		return this.service.put(dto)
	}

	@ApiOperation({ summary: 'Get list' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Get()
	public async get(@Query() dto: GetScheduleParamsDto) {
		return this.service.getList(dto)
	}
}
