import { DynamicModule, Module } from '@nestjs/common'
import { ProductsModule } from '../products/products.module'
import { provideEntity } from 'src/libs'
import {
	BUCKET_SERVICE,
	ORDERS_PRODUCTS_REPOSITORY,
	ORDERS_REPOSITORY,
	ORDERS_SERVICE,
	ORDERS_USERS_REPOSITORY,
} from './typing'
import { Order, OrderProduct, OrderUser } from './entities'
import { provideClass } from 'src/shared'
import { BucketService, OrdersService, OrdersUsersService } from './services'
import { SettingsModule } from '../settings/settings.module'
import { UsersModule } from '../users/users.module'
import { ContentModule } from '../content/content.module'

@Module({})
export class OrdersModule {
	static forRoot(): DynamicModule {
		return {
			module: OrdersModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: OrdersModule,
			imports: [
				ProductsModule.forFeature(),
				SettingsModule.forFeature(),
				UsersModule.forFeature(),
				ContentModule.forFeature(),
			],
			providers: [
				provideEntity(ORDERS_REPOSITORY, Order),
				provideEntity(ORDERS_PRODUCTS_REPOSITORY, OrderProduct),
				provideEntity(ORDERS_USERS_REPOSITORY, OrderUser),
				provideClass(ORDERS_SERVICE, OrdersService),
				provideClass(BUCKET_SERVICE, BucketService),
				OrdersUsersService,
			],
			exports: [ORDERS_SERVICE, ORDERS_REPOSITORY, BUCKET_SERVICE, ORDERS_USERS_REPOSITORY],
		}
	}
}
