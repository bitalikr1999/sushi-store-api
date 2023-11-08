import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('contentBlocks')
export class ContentBlock {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	parentTable: string

	@Column()
	parentId: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
