import { DynamicModule, Module } from '@nestjs/common'
import { PagesModule } from 'src/domain/pages/pages.module'
import { PublicPagesController } from './pages.controller'
import { PublicPagesService } from './pages.service'
import { ContentModule } from 'src/domain/content/content.module'
import { MenuModule } from 'src/domain/menu/menu.module'
import { FavoritiesModule } from 'src/domain/favorities/favorities.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { InstagramModule } from 'src/libs'
import { UsersModule } from 'src/domain/users/users.module'

@Module({})
export class PublicPagesModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicPagesModule,
			imports: [
				PagesModule.forFeature(),
				ContentModule.forFeature(),
				MenuModule.forFeature(),
				FavoritiesModule.forFeature(),
				ProductsModule.forFeature(),
				InstagramModule.forFeature(),
				UsersModule.forFeature(),
			],
			controllers: [PublicPagesController],
			providers: [PublicPagesService],
		}
	}
}
