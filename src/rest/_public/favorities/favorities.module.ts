import { DynamicModule, Module } from '@nestjs/common'
import { FavoritiesModule } from 'src/domain/favorities/favorities.module'
import { MenuModule } from 'src/domain/menu/menu.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { PublicFavoritiesService } from './favorities.service'
import { RestPublicFavoritiesController } from './favorities.controller'
import { UsersModule } from 'src/domain/users/users.module'

@Module({})
export class PublicFavoritiesModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicFavoritiesModule,
			imports: [
				ProductsModule.forFeature(),
				MenuModule.forFeature(),
				FavoritiesModule.forFeature(),
				UsersModule.forFeature(),
			],
			providers: [PublicFavoritiesService],
			controllers: [RestPublicFavoritiesController],
		}
	}
}
