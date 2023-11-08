import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestNovaPoshtaService } from './nova-poshta.service'
import { FindCitiesParamsDto, FindWarehousesParamsDto } from './dto'

@ApiTags('COMMON | Nova poshta')
@Controller('/api/nova-poshta')
export class RestNovaPoshtaController {
	constructor(private readonly restNovaPoshtaService: RestNovaPoshtaService) {}

	@ApiOperation({ summary: 'Find cities' })
	@ApiResponse({
		status: 201,
		description: 'return cities array',
	})
	@Get()
	public cities(@Query() params: FindCitiesParamsDto) {
		return this.restNovaPoshtaService.findCities(params)
	}

	@ApiOperation({ summary: 'Find warehouses' })
	@ApiResponse({
		status: 201,
		description: 'return warehouses array',
	})
	@Get('warehouses')
	public warehouses(@Query() params: FindWarehousesParamsDto) {
		return this.restNovaPoshtaService.findWarehouses(params)
	}
}
