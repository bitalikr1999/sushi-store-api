import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RestApiScheduleService } from './schedule.service'

@ApiTags('API | Schedule')
@Controller('api/schedule')
export class ApiScheduleController {
	constructor(private readonly apiScheduleService: RestApiScheduleService) {}

	@Get('current-shift')
	public getCurrentShift() {
		return this.apiScheduleService.getCurrentShift()
	}
}
