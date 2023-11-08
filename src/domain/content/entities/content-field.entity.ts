import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IContentField } from '../typing'

@Entity('contentFields')
export class ContentField implements IContentField {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	parentTable: string

	@Column()
	parentId: number

	@Column({ type: 'jsonb' })
	content: any

	@Column()
	key: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@Column({ nullable: true })
	authorId?: number
}
