import { DynamicModule, Module } from '@nestjs/common'
import { PostsModule } from 'src/domain/posts/posts.module'
import { RestAdminPostCategoriesController } from './post-categories.controller'
import { RestAdminPostCategoriesService } from './post-categories.service'

@Module({})
export class RestAdminPostCategoriesModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminPostCategoriesModule,
			controllers: [RestAdminPostCategoriesController],
			providers: [RestAdminPostCategoriesService],
			imports: [PostsModule.forFeature()],
		}
	}
}
