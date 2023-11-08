import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	IMenuItemRepository,
	IMenuItemsPayloadCreate,
	IMenuItemsService,
	IMenuItemsTranslateRepository,
	MENU_ITEM_REPOSITORY,
	MENU_ITEM_TRANSLATE_REPOSITORY,
} from '../typing'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

@Injectable()
export class MenuItemService implements IMenuItemsService {
	@Inject(MENU_ITEM_REPOSITORY) private readonly menuItemsRepository: IMenuItemRepository
	@Inject(MENU_ITEM_TRANSLATE_REPOSITORY)
	private readonly menuItemsTranslateRepository: IMenuItemsTranslateRepository

	public async create(payload: IMenuItemsPayloadCreate) {
		const data: Partial<IMenuItemsPayloadCreate> = omitBy(omit(payload), isNil)
		const item = await this.menuItemsRepository.save({
			...data,
		})

		await this.putTranslations(item.id, payload.translations, false)
		return
	}

	public async update(id: number, payload: Partial<IMenuItemsPayloadCreate>): Promise<void> {
		const item = await this.menuItemsRepository.findOne({ where: { id } })
		if (!item) throw new NotFoundException('Menu item not found')

		const dataEntity = omitBy(omit(payload, ['translations']), isNil)

		if (!isEmpty(dataEntity)) {
			await this.menuItemsRepository.update(id, dataEntity)
		}

		if (!isEmpty(payload.translations)) {
			await this.putTranslations(item.id, payload.translations)
		}
	}

	public async delete(id: number): Promise<void> {
		await this.menuItemsRepository.delete({ id })
	}

	public async getItems(parentId: number, parentColumn: string) {
		const items = await this.menuItemsRepository
			.createQueryBuilder('it')
			.where('it.parentId = :parentId', { parentId })
			.andWhere('it.parentColumn = :parentColumn', { parentColumn })
			.leftJoinAndSelect('it.translates', 'translates')
			.orderBy('it.order', 'ASC')
			.getMany()

		// await Promise.all(
		// 	items.map(async (it, index, arr: IMenuItem[]) => {
		// 		let children: IMenuItem[] = await this.getItems(it.id, MenuParent.MenuItem)
		// 		if (isEmpty(children)) return
		// 		return (arr[index].children = children)
		// 	}),
		// )

		return items
	}

	private async putTranslations(
		itemId: number,
		translates: IMenuItemsPayloadCreate['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.menuItemsTranslateRepository.delete({ itemId })
		const toSave = translates.map(it => ({
			lang: it.lang,
			name: it.name,
			itemId,
		}))

		return await this.menuItemsTranslateRepository.insert(toSave)
	}
}
