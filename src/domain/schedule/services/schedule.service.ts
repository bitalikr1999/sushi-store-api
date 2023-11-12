import { Inject, Injectable } from '@nestjs/common'
import { IPutShiftPayload, IScheduleService, IScheduleShiftsRepository } from '../typing'
import { SCHEDULE_SHIFTS_REPOSITORY } from '../typing/consts'

@Injectable()
export class ScheduleService implements IScheduleService {
	constructor(
		@Inject(SCHEDULE_SHIFTS_REPOSITORY)
		private readonly scheduleShiftsRepository: IScheduleShiftsRepository,
	) {}

	public async put(payload: IPutShiftPayload): Promise<void> {
		let exist = await this.scheduleShiftsRepository.findOneBy({ date: payload.date })
		if (exist) {
			exist = this.scheduleShiftsRepository.merge(exist, payload)
			await this.scheduleShiftsRepository.save(exist)
		} else {
			await this.scheduleShiftsRepository.save(payload)
		}
	}
}
