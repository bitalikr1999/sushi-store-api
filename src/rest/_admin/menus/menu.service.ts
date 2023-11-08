import { Inject, Injectable } from '@nestjs/common'
import {
	IMenuItemsService,
	IMenuService,
	MENU_ITEMS_SERVICE,
	MENU_SERVICE,
} from 'src/domain/menu/typing'
import { IPagination } from 'src/shared'
import { CreateMenuDto, CreateMenuItemDto, EditMenuItemDto } from './dto'

@Injectable()
export class RestAdminMenuService {
	@Inject(MENU_SERVICE) private readonly menuService: IMenuService
	@Inject(MENU_ITEMS_SERVICE) private readonly menuItemsService: IMenuItemsService

	public async createMenuItem(dto: CreateMenuItemDto) {
		return await this.menuItemsService.create({
			key: dto.key,
			parentId: dto.parentId,
			url: dto.url,
			parentColumn: dto.parentColumn,
			translations: dto.translates,
			order: dto.order,
		})
	}

	public async updateMenuItem(id: number, dto: EditMenuItemDto) {
		await this.menuItemsService.update(id, {
			key: dto.key,
			parentId: dto.parentId,
			url: dto.url,
			parentColumn: dto.parentColumn,
			translations: dto.translates,
			order: dto.order,
		})
	}

	public async createMenu(dto: CreateMenuDto) {
		return await this.menuService.create({
			key: dto.key,
			name: dto.name,
			locations: dto.locations,
		})
	}

	public async removeMenu(id: number) {
		await this.menuService.delete(id)
	}

	public async menusList(pagination: IPagination) {
		return await this.menuService.getMenuList(pagination)
	}

	public async getMenu(id: number) {
		return await this.menuService.getMenuById(id)
	}

	public async removeMenuItems(id: number) {
		return this.menuItemsService.delete(id)
	}
}
