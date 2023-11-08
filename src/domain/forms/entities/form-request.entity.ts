import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { FormRequestStatus, IFormRequest } from '../typing'

@Entity('formRequests')
export class FormRequest implements IFormRequest {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	form: string

	@Column()
	content: string

	@Column({ nullable: true })
	title?: string

	@Column({ nullable: true, type: 'jsonb' })
	data?: any

	@Column({ nullable: true })
	userName?: string

	@Column({ nullable: true })
	userEmail?: string

	@Column({ nullable: true })
	userPhoneNumber?: string

	@Column({ type: 'varchar', default: FormRequestStatus.New })
	status: FormRequestStatus

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@Column({ nullable: true })
	fromUserId?: number

	@Column({ nullable: true })
	responsibleManagerId?: number
}
