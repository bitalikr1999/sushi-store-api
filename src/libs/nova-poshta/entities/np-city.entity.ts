import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { INPCity } from '../typing'

@Entity('npCitiies')
export class NPCity implements INPCity {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@Column({ nullable: true })
	area: string

	@Column({ nullable: true })
	areaRef?: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
