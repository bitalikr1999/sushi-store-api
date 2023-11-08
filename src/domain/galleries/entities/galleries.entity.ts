import { Media } from 'src/domain/media/entities'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('galleries')
export class Gallery {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	mediaId: number

	@Column()
	parentTable: string

	@Column()
	parentId: number

	@Column({ default: 0 })
	order: number

	@Column({ nullable: true })
	data?: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@ManyToOne(() => Media)
	@JoinColumn({ name: 'mediaId' })
	media: Media
}
