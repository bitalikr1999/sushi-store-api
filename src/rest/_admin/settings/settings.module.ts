import { DynamicModule, Module } from '@nestjs/common'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { SettingsModule } from 'src/domain/settings/settings.module'
import { RestAdminSettingsService } from './settings.service'
import { RestAdminSettingsController } from './settings.controller'

@Module({})
export class RestAdminSettingsModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminSettingsModule,
			imports: [SettingsModule.forFeature(), SessionsModule.forFeature()],
			providers: [RestAdminSettingsService],
			controllers: [RestAdminSettingsController],
		}
	}
}
