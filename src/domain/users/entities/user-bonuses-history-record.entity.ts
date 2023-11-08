import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { IUserBonusesHistoryRecord } from '../typing'
import { User } from './user.entity'

@Entity('usersBonusesHistoryRecords')
export class UserBonusesHistoryRecord implements IUserBonusesHistoryRecord {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	bonuses: number

	@Column()
	title: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@Column()
	userId: number

	@Column({ nullable: true })
	authorId?: number

	@ManyToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user?: User
}
