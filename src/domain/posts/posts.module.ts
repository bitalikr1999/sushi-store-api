import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import {
	Post,
	PostCategory,
	PostCategoryTranslation,
	PostToCategory,
	PostTranslation,
	PostType,
	PostTypeTranslation,
} from './entity'
import {
	POSTS_CATEGORIES_REPOSITORY,
	POSTS_CATEGORIES_SERVICE,
	POSTS_CATEGORIES_TRANSLATE_REPOSITORY,
	POSTS_REPOSITORY,
	POSTS_SERVICE,
	POSTS_TRANSLATE_REPOSITORY,
	POSTS_TYPE_SERVICE,
	POSTS_TYPE_TRANSLATE_REPOSITORY,
	POST_TO_CATEGORY_REPOSITORY,
	POST_TYPE_REPOSITORY,
} from './typing'
import { provideClass } from 'src/shared'
import { PostCategoryService, PostService, PostTypeService } from './services'

@Module({})
export class PostsModule {
	static getProviders() {
		return [
			provideEntity(POSTS_REPOSITORY, Post),
			provideEntity(POSTS_CATEGORIES_REPOSITORY, PostCategory),
			provideEntity(POST_TYPE_REPOSITORY, PostType),
			provideEntity(POST_TO_CATEGORY_REPOSITORY, PostToCategory),
			provideEntity(POSTS_TRANSLATE_REPOSITORY, PostTranslation),
			provideEntity(POSTS_CATEGORIES_TRANSLATE_REPOSITORY, PostCategoryTranslation),
			provideEntity(POSTS_TYPE_TRANSLATE_REPOSITORY, PostTypeTranslation),
			provideClass(POSTS_SERVICE, PostService),
			provideClass(POSTS_CATEGORIES_SERVICE, PostCategoryService),
			provideClass(POSTS_TYPE_SERVICE, PostTypeService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: PostsModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: PostsModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [
				POSTS_SERVICE,
				POSTS_CATEGORIES_SERVICE,
				POSTS_TYPE_SERVICE,
				POSTS_REPOSITORY,
				POSTS_CATEGORIES_REPOSITORY,
				POST_TYPE_REPOSITORY,
			],
		}
	}
}
