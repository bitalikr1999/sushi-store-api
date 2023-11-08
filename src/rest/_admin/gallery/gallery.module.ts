import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { RestAdminGalleryService } from './gallery.service'
import { RestAdminGalleryController } from './gallery.controller'

@Module({})
export class RestAdminGalleryModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminGalleryModule,
			imports: [GalleryModule.forFeature()],
			providers: [RestAdminGalleryService],
			controllers: [RestAdminGalleryController],
		}
	}
}
