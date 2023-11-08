import { Repository } from 'typeorm'
import { IMenu, IMenuItem, IMenuItemsTranslate } from './menu.interface'

export type IMenuRepository = Repository<IMenu>
export type IMenuItemRepository = Repository<IMenuItem>
export type IMenuItemsTranslateRepository = Repository<IMenuItemsTranslate>
