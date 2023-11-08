import { DynamicModule, Module } from '@nestjs/common'
import { MediaModule } from 'src/domain/media/media.module'
import { RestAdminMediaController } from './media.controller'
import { RestAdminMediaService } from './media.service'
import { FilesStorageModule, RedisModule } from 'src/libs'

@Module({})
export class RestAdminMediaModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminMediaModule,
			controllers: [RestAdminMediaController],
			providers: [RestAdminMediaService],
			imports: [
				MediaModule.forFeature(),
				FilesStorageModule.forFeature(),
				RedisModule.forFeature(),
			],
		}
	}
}
