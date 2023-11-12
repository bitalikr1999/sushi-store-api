import { Inject, Injectable } from '@nestjs/common'
import {
	MENU_SERVICE,
	IMenuService,
	MENU_REPOSITORY,
	IMenuRepository,
} from 'src/domain/menu/typing'

@Injectable()
export class MenusService {
	@Inject(MENU_SERVICE)
	private readonly menuService: IMenuService

	@Inject(MENU_REPOSITORY)
	private readonly menuRepository: IMenuRepository
}
