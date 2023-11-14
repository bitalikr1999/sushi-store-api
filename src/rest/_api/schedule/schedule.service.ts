import { Inject, Injectable } from '@nestjs/common'
import { IScheduleShiftsRepository } from 'src/domain/schedule/typing'
import { SCHEDULE_SHIFTS_REPOSITORY } from 'src/domain/schedule/typing/consts'
import { dateToSqlFormat } from 'src/shared/helpers/date.helpers'

@Injectable()
export class RestApiScheduleService {
	constructor(
		@Inject(SCHEDULE_SHIFTS_REPOSITORY)
		private readonly scheduleShiftsRepository: IScheduleShiftsRepository,
	) {}

	public async getCurrentShift() {
		const shift = await this.scheduleShiftsRepository.findOneBy({
			date: dateToSqlFormat(new Date()),
		})

		return shift
			? shift
			: {
					date: new Date(),
					start: 1100,
					end: 2100,
					isClosed: false,
			  }
	}
}
