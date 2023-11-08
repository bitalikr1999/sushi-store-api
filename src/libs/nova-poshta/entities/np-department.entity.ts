import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { INPDepartment } from '../typing'

@Entity('npDepartments')
export class NPDepartment implements INPDepartment {
	@PrimaryColumn()
	id: string

	@Column()
	cityId: string

	@Column()
	name: string

	@Column()
	number: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
