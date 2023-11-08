import { Lang } from 'src/shared'
import { MenuLocations, MenuParent } from '../enums'

export interface IMenu {
	id: number
	key: string
	name: string
	locations?: MenuLocations

	createdAt?: string
	updatedAt?: string

	children?: IMenuItem[]
}

export interface IMenuItem {
	id: number
	key: string
	parentId?: number
	url: string
	parentColumn: MenuParent
	order: number

	children?: IMenuItem[]

	menu?: IMenu
	translates?: IMenuItemsTranslate[]
	translate?: IMenuItemsTranslate

	createdAt?: string
}

export interface IMenuItemsTranslate {
	id: number
	name: string
	itemId: number
	lang: Lang
}
