import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { MenuItemTranslate } from './meni-items-translates.entity'
import { IMenuItem, MenuParent } from '../typing'

@Entity('menuItems')
export class MenuItem implements IMenuItem {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	key: string

	@Column()
	parentId: number

	@Column({ default: 0 })
	order: number

	@Column({ type: 'varchar', enum: MenuParent, default: MenuParent.Menu })
	parentColumn: MenuParent

	@Column()
	url: string

	@OneToMany(() => MenuItemTranslate, mit => mit.menuItem)
	translates?: MenuItemTranslate[]

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string
}
