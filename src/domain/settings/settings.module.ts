import { DynamicModule, Module } from '@nestjs/common'
import { RedisModule, provideEntity } from 'src/libs'
import { SETTINGS_REPOSITORY, SETTINGS_SERVICE } from './typing/consts'
import { SettingRecord } from './entities'
import { provideClass } from 'src/shared'
import { SettingsService } from './services'

@Module({})
export class SettingsModule {
	static forRoot(): DynamicModule {
		return {
			module: SettingsModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: SettingsModule,
			imports: [RedisModule.forFeature()],
			providers: [
				provideEntity(SETTINGS_REPOSITORY, SettingRecord),
				provideClass(SETTINGS_SERVICE, SettingsService),
			],
			exports: [SETTINGS_REPOSITORY, SETTINGS_SERVICE],
		}
	}
}
