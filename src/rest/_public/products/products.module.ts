import { DynamicModule, Module } from '@nestjs/common'
import { PublicProductsController } from './products.controller'
import { PublicProductsService } from './products.service'
import { ProductsModule } from 'src/domain/products/products.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { ContentModule } from 'src/domain/content/content.module'
import { MenuModule } from 'src/domain/menu/menu.module'
import { FavoritiesModule } from 'src/domain/favorities/favorities.module'
import { UsersModule } from 'src/domain/users/users.module'

@Module({})
export class PublicProductsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicProductsModule,
			imports: [
				ProductsModule.forFeature(),
				GalleryModule.forFeature(),
				ContentModule.forFeature(),
				MenuModule.forFeature(),
				FavoritiesModule.forFeature(),
				UsersModule.forFeature(),
			],
			controllers: [PublicProductsController],
			providers: [PublicProductsService],
		}
	}
}
