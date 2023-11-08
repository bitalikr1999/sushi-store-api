import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminSettingsService } from './settings.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { GetSettingsParamsDto, PutSettingsDto, PutSettingsPayloadDto } from './dtos'

@ApiTags('ADMIN | Settings')
@Controller('admin/settings')
export class RestAdminSettingsController {
	constructor(private readonly restAdminSettingsService: RestAdminSettingsService) {}

	@ApiOperation({ summary: 'Put settings' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@Body() dto: PutSettingsDto) {
		return this.restAdminSettingsService.putMany(dto)
	}

	@ApiOperation({ summary: 'Put setting' })
	@ApiResponse({
		status: 201,
	})
	@Post('single')
	@AuthGuard()
	public putSingle(@Body() dto: PutSettingsPayloadDto) {
		return this.restAdminSettingsService.put(dto)
	}

	@ApiOperation({ summary: 'Get settings' })
	@ApiResponse({
		status: 201,
	})
	@Get()
	@AuthGuard()
	public get(@Query() params: GetSettingsParamsDto) {
		return this.restAdminSettingsService.get(params)
	}
}
