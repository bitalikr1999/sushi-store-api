import { IPagination, Lang } from 'src/shared'
import { MenuLocations, MenuParent } from '../enums'
import { IMenu, IMenuItem } from './menu.interface'

export interface IMenuService {
	create(payload: IMenuCreatePayload): Promise<IMenu>
	update(id: number, payload: Partial<IMenuCreatePayload>): Promise<IMenu>
	delete(id: number): Promise<void>
	getMenuList(pagination: IPagination): Promise<{ items: IMenu[]; count: number }>
	getMenuById(id: number): Promise<IMenu>
}

export interface IMenuItemsService {
	create(payload: IMenuItemsPayloadCreate): Promise<void>
	update(id: number, payload: Partial<IMenuItemsPayloadCreate>): Promise<void>
	getItems(parentId: number, parentColumn: string): Promise<IMenuItem[]>
	delete(id: number): Promise<void>
}

export interface IMenuCreatePayload {
	key: string
	name: string
	locations?: MenuLocations
}

export interface IMenuItemsPayloadCreate {
	key: string
	parentId?: number
	parentColumn?: MenuParent
	url: string
	order?: number
	translations?: {
		lang: Lang
		name: string
	}[]
}
