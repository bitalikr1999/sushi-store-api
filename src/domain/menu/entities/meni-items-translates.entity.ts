import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MenuItem } from './menu-items.entity'
import { Lang } from 'src/shared'
import { IMenuItemsTranslate } from '../typing'

@Entity('menuItemsTranslates')
export class MenuItemTranslate implements IMenuItemsTranslate {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	itemId: number

	@Column({ type: 'varchar' })
	lang: Lang

	@ManyToOne(() => MenuItem, mi => mi.translates, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'itemId' })
	menuItem?: MenuItem
}
