import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { MEDIA_REPOSITORY, MEDIA_SERVICE } from './typing/consts'
import { Media } from './entities'
import { provideClass } from 'src/shared'
import { MediaService } from './services/media.service'

@Module({})
export class MediaModule {
	static forFeature(): DynamicModule {
		return {
			module: MediaModule,
			providers: [
				provideEntity(MEDIA_REPOSITORY, Media),
				provideClass(MEDIA_SERVICE, MediaService),
			],
			exports: [MEDIA_REPOSITORY, MEDIA_SERVICE],
		}
	}

	static forRoot(): DynamicModule {
		return {
			module: MediaModule,
		}
	}
}
