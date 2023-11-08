import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IUserReferral } from '../typing'
import { User } from './user.entity'

@Entity('usersReferrals')
export class UserReferral implements IUserReferral {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userId: number

	@Column()
	invitedId: number

	@Column({ type: 'boolean', default: false })
	isBonusesAccured: boolean

	@Column({ default: 100 })
	bonusesToAccured: number

	@ManyToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user?: User

	@ManyToOne(() => User)
	@JoinColumn({ name: 'invitedId' })
	invitedUser?: User
}
