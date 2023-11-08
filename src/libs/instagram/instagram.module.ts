import { DynamicModule, Module, OnModuleInit } from '@nestjs/common'
import { IInstagramModuleOptions, INSTAGRAM_OPTIONS, INSTAGRAM_SERVICES } from './typing'
import { provideClass } from 'src/shared'
import { InstagramService } from './instagram.service'

@Module({})
export class InstagramModule {
	static options: IInstagramModuleOptions

	static getProviders() {
		return [
			provideClass(INSTAGRAM_SERVICES, InstagramService),
			{
				provide: INSTAGRAM_OPTIONS,
				useValue: InstagramModule.options,
			},
		]
	}

	static forRoot(options: IInstagramModuleOptions): DynamicModule {
		this.options = options
		return {
			module: InstagramModule,
			providers: this.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: InstagramModule,
			providers: this.getProviders(),
			exports: [INSTAGRAM_SERVICES],
		}
	}
}
