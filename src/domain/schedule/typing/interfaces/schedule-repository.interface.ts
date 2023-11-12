import { Repository } from 'typeorm'
import { IScheduleShift } from './schedule-shift.interface'

export type IScheduleShiftsRepository = Repository<IScheduleShift>
