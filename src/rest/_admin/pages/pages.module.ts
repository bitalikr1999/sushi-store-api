import { DynamicModule, Module } from '@nestjs/common'
import { PagesModule } from 'src/domain/pages/pages.module'
import { RestAdminPagesService } from './pages.service'
import { RestAdminPagesController } from './pages.controller'
import { ContentModule } from 'src/domain/content/content.module'

@Module({})
export class AdminRestPagesModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminRestPagesModule,
			imports: [PagesModule.forFeature(), ContentModule.forFeature()],
			providers: [RestAdminPagesService],
			controllers: [RestAdminPagesController],
		}
	}
}
