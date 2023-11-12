import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IScheduleShift } from '../typing'

@Entity('scheduleShifts')
export class ScheduleShift implements IScheduleShift {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'date' })
	date: string

	@Column({ nullable: true })
	start: number

	@Column({ nullable: true })
	end: number

	@Column({ default: false })
	isClosed: boolean
}
