import { Inject } from '@nestjs/common'
import {
	IMenuRepository,
	IMenuService,
	MENU_REPOSITORY,
	MENU_SERVICE,
} from 'src/domain/menu/typing'
import { getTranslate } from '../helpers/translations.helpers'
import { Lang } from '../enums'
import { IPublicDataResponse } from '../interfaces'
import { IUsersRepository, USERS_REPOSITORY } from 'src/domain/users/typing'

export abstract class PublicService {
	@Inject(MENU_SERVICE)
	private readonly menuService: IMenuService

	@Inject(MENU_REPOSITORY)
	private readonly menuRepository: IMenuRepository

	@Inject(USERS_REPOSITORY)
	private readonly usersRepository: IUsersRepository

	protected async getCommonData(userId?: number) {
		const result: IPublicDataResponse = {
			topMenu: await this.getMenu('primary'),
			secondMenu: await this.getMenu('categories'),
			footerMenu: await this.getMenu('footer'),
			user: null,
		}

		if (userId) result.user = await this.usersRepository.findOneBy({ id: userId })
		else {
			result.user = {
				id: null,
				firstName: null,
				lastName: null,
				email: null,
				role: null,
			}
		}

		return result
	}

	protected async getMenu(key: string) {
		try {
			const { id } = await this.menuRepository.findOneBy({ key })
			const menu = await this.menuService.getMenuById(id)

			menu.children.map((it, i, arr) => {
				arr[i].translate = getTranslate(it.translates, Lang.uk)
			})

			return menu
		} catch (e) {
			return null
		}
	}
}
