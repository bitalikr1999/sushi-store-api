import { Inject, Injectable } from '@nestjs/common'
import { IScheduleService, IScheduleShiftsRepository } from 'src/domain/schedule/typing'
import { SCHEDULE_SERVICE, SCHEDULE_SHIFTS_REPOSITORY } from 'src/domain/schedule/typing/consts'
import { GetScheduleParamsDto, PutScheduleShiftPayloadDto } from './dto'
import { dateToSqlFormat } from 'src/shared/helpers/date.helpers'

@Injectable()
export class RestAdminScheduleService {
	constructor(
		@Inject(SCHEDULE_SHIFTS_REPOSITORY)
		private readonly scheduleShiftsRepository: IScheduleShiftsRepository,

		@Inject(SCHEDULE_SERVICE)
		private readonly scheduleService: IScheduleService,
	) {}

	public async getList(params: GetScheduleParamsDto) {
		const items = await this.scheduleShiftsRepository
			.createQueryBuilder('it')
			.where('it.date >= :start', { start: dateToSqlFormat(params.from) })
			.andWhere('it.date <= :end', { end: dateToSqlFormat(params.to) })
			.orderBy('it.start')
			.getMany()

		return items
	}

	public async put(dto: PutScheduleShiftPayloadDto) {
		await this.scheduleService.put(dto)
	}
}
