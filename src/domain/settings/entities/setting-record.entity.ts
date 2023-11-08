import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { SettingKey } from '../typing/enums'

@Entity('settings')
export class SettingRecord {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar' })
	key: SettingKey

	@Column({ type: 'text' })
	value: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
