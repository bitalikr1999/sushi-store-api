import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import {
	MENU_ITEMS_SERVICE,
	MENU_ITEM_REPOSITORY,
	MENU_ITEM_TRANSLATE_REPOSITORY,
	MENU_REPOSITORY,
	MENU_SERVICE,
} from './typing'
import { Menu, MenuItem, MenuItemTranslate } from './entities'
import { MenuItemService, MenuService } from './services'
import { provideClass } from 'src/shared'
import { MenuSeed } from './seeds'

@Module({})
export class MenuModule {
	static getProviders() {
		return [
			provideEntity(MENU_REPOSITORY, Menu),
			provideEntity(MENU_ITEM_REPOSITORY, MenuItem),
			provideEntity(MENU_ITEM_TRANSLATE_REPOSITORY, MenuItemTranslate),
			provideClass(MENU_SERVICE, MenuService),
			provideClass(MENU_ITEMS_SERVICE, MenuItemService),
			MenuItemService,
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: MenuModule,
			providers: [...this.getProviders(), MenuSeed],
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: MenuModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [MENU_SERVICE, MENU_ITEMS_SERVICE, MENU_REPOSITORY],
		}
	}
}
