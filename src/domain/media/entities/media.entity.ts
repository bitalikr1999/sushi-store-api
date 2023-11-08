import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IMedia } from '../typing'

@Entity('media')
export class Media implements IMedia {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: string

	@Column()
	name: string

	@Column()
	url: string

	@Column()
	userId: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
