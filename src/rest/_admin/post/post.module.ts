import { DynamicModule, Module } from '@nestjs/common'
import { PostsModule } from 'src/domain/posts/posts.module'
import { RestAdminPostService } from './post.service'
import { RestAdminPostController } from './post.controller'

@Module({})
export class RestAdminPostModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminPostModule,
			providers: [RestAdminPostService],
			controllers: [RestAdminPostController],
			imports: [PostsModule.forFeature()],
		}
	}
}
