import { DynamicModule, Module } from '@nestjs/common'
import { RestAdminPostTypeController } from './post-type.controller'
import { RestAdminPostTypeService } from './post-type.service'
import { PostsModule } from 'src/domain/posts/posts.module'

@Module({})
export class RestAdminPostTypeModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminPostTypeModule,
			controllers: [RestAdminPostTypeController],
			providers: [RestAdminPostTypeService],
			imports: [PostsModule.forFeature()],
		}
	}
}
