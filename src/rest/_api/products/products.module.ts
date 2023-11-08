import { DynamicModule, Module } from '@nestjs/common'
import { ContentModule } from 'src/domain/content/content.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { UsersModule } from 'src/domain/users/users.module'
import { ApiProductsService } from './products.service'
import { ApiProductsController } from './products.controller'

@Module({})
export class ApiProductsModule {
	static forRoot(): DynamicModule {
		return {
			module: ApiProductsModule,
			imports: [
				ProductsModule.forFeature(),
				GalleryModule.forFeature(),
				ContentModule.forFeature(),
				UsersModule.forFeature(),
			],
			providers: [ApiProductsService],
			controllers: [ApiProductsController],
		}
	}
}
