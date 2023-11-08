import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { CONTENT_FIELDS_REPOSITORY, CONTENT_SERVICE } from './typing'
import { ContentField } from './entities'
import { ContentService } from './services'
import { provideClass } from 'src/shared'
import { PRODUCT_CATEGORIES_REPOSITORY } from '../products/typing'
import { ProductCategory } from '../products/entities'

@Module({})
export class ContentModule {
	static getProviders() {
		return [
			provideEntity(CONTENT_FIELDS_REPOSITORY, ContentField),
			provideClass(CONTENT_SERVICE, ContentService),
			provideEntity(PRODUCT_CATEGORIES_REPOSITORY, ProductCategory),
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: ContentModule,
			imports: [],
			providers: ContentModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ContentModule,
			imports: [],
			providers: ContentModule.getProviders(),
			exports: [CONTENT_SERVICE, CONTENT_FIELDS_REPOSITORY],
		}
	}
}
