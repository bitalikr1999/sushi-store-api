import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { UserRole, UserStatus } from '../typing'
import { UserBonusesHistoryRecord } from './user-bonuses-history-record.entity'

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'char', nullable: false })
	role: UserRole

	@Column({ type: 'char', default: UserStatus.Active, nullable: false })
	status: UserStatus

	@Column({ type: 'float', default: 0, nullable: true })
	progressFill: number

	@Column({ type: 'varchar', nullable: false, unique: true })
	email: string

	@Column({ nullable: true })
	firstName: string

	@Column({ nullable: true })
	lastName: string

	@Column({ type: 'varchar', nullable: false, select: false })
	password: string

	@Column({ type: 'varchar', nullable: false, select: false })
	passwordSalt: string

	@Column({ type: 'int', default: 0 })
	bonus?: number

	@Column({ nullable: true })
	referalCode: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => UserBonusesHistoryRecord, record => record.user)
	bonusesHistory?: UserBonusesHistoryRecord[]
}
