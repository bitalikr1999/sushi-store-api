import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import {
	IMenuItemsPayloadCreate,
	IMenuItemsService,
	IMenuRepository,
	IMenuService,
	MENU_ITEMS_SERVICE,
	MENU_REPOSITORY,
	MENU_SERVICE,
} from '../typing'
import { MENU_SEED_DATA } from 'src/config/seeds/menu.seed'
import { isEmpty } from 'lodash'

@Injectable()
export class MenuSeed extends Seeder {
	@Inject(MENU_REPOSITORY) private readonly menuRepository: IMenuRepository
	@Inject(MENU_SERVICE) private readonly menuService: IMenuService
	@Inject(MENU_ITEMS_SERVICE) private readonly menuItemService: IMenuItemsService

	protected MAX_COUNT = 2
	protected name = 'Menu'

	protected async seed(): Promise<void> {
		if (await this.checkIsNeedToSeed()) return

		MENU_SEED_DATA().forEach(async it => {
			try {
				const { id } = await this.menuService.create({
					key: it.key,
					name: it.name,
					locations: it.location,
				})
				if (!isEmpty(it.children)) {
					it.children.forEach(async el => {
						await this.createMenuItem({
							parentId: id,
							key: el.key,
							parentColumn: el.parentColumn,
							url: el.url,
							translations: el.translations,
						})
					})
				}
			} catch (e) {}
		})
	}

	protected async checkIsNeedToSeed() {
		const count = await this.menuRepository.count()
		return count > this.MAX_COUNT
	}
	protected async createMenuItem(payload: IMenuItemsPayloadCreate) {
		await this.menuItemService.create(payload)
	}
}
