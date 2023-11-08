import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IMenu, MenuLocations } from '../typing'

@Entity('menus')
export class Menu implements IMenu {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	key: string

	@Column()
	name: string

	@Column({ type: 'varchar', enum: MenuLocations, default: MenuLocations.Primary })
	locations: MenuLocations

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
