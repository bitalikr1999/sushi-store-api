import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { PAGES_REPOSITORY, PAGES_SERVICE, PAGES_TRANSLATIONS_REPOSITORY } from './typing/consts'
import { Page, PageTranslation } from './entity'
import { provideClass } from 'src/shared'
import { PagesService, PagesTranslationsService } from './services'

@Module({})
export class PagesModule {
	static getProviders() {
		return [
			provideEntity(PAGES_REPOSITORY, Page),
			provideEntity(PAGES_TRANSLATIONS_REPOSITORY, PageTranslation),
			provideClass(PAGES_SERVICE, PagesService),
			PagesTranslationsService,
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: PagesModule,
			providers: PagesModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: PagesModule,
			providers: PagesModule.getProviders(),
			exports: [PAGES_REPOSITORY, PAGES_SERVICE],
		}
	}
}
