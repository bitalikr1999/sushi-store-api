import { DynamicModule, Module } from '@nestjs/common'
import { MenuModule } from 'src/domain/menu/menu.module'
import { RestAdminMenuService } from './menu.service'
import { RestAdminMenuController } from './menu.controller'

@Module({})
export class RestAdminMenuModule {
	static forFeature(): DynamicModule {
		return {
			module: RestAdminMenuModule,
			controllers: [RestAdminMenuController],
			providers: [RestAdminMenuService],
			imports: [MenuModule.forFeature()],
		}
	}
}
