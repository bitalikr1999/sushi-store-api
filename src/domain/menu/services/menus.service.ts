import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	IMenuCreatePayload,
	IMenuRepository,
	IMenuService,
	MENU_REPOSITORY,
	MenuParent,
} from '../typing'
import { isEmpty, isNil, omit, omitBy } from 'lodash'
import { IPagination, paginateAndGetMany } from 'src/shared'
import { MenuItemService } from './menu-items.service'

@Injectable()
export class MenuService implements IMenuService {
	@Inject(MENU_REPOSITORY) private readonly menuRepository: IMenuRepository
	constructor(private readonly menuItemsService: MenuItemService) {}

	public async create(payload: IMenuCreatePayload) {
		const exist = await this.menuRepository.findOne({ where: { key: payload.key } })

		if (exist) throw new ForbiddenException('the key must be unique')

		return await this.menuRepository.save({
			key: payload.key,
			name: payload.name,
			locations: payload.locations,
		})
	}

	public async update(id: number, payload: Partial<IMenuCreatePayload>) {
		let menu = await this.menuRepository.findOneBy({ id })

		if (isEmpty(menu)) throw new NotFoundException('Menu not found')

		menu = await this.menuRepository.merge(menu, omitBy(omit(payload), isNil))

		await this.menuRepository.update(id, menu)

		return menu
	}

	public async delete(id: number) {
		await this.menuRepository.delete(id)
	}

	public async getMenuList(pagination: IPagination) {
		const query = await this.menuRepository.createQueryBuilder('it').where('it.id IS NOT NULL')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return { items, count }
	}
	public async getMenuById(id: number) {
		const menu = await this.menuRepository.findOneBy({ id })
		const menuItems = await this.menuItemsService.getItems(menu.id, MenuParent.Menu)

		return {
			...menu,
			children: menuItems,
		}
	}
}
