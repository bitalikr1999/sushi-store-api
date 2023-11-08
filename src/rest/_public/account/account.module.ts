import { DynamicModule, Module } from '@nestjs/common'
import { PublicAccountController } from './account.controller'
import { UsersModule } from 'src/domain/users/users.module'
import { PublickAccountService } from './account.service'
import { MenuModule } from 'src/domain/menu/menu.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { FavoritiesModule } from 'src/domain/favorities/favorities.module'
import { AccountOrderHistoryService } from './account-order-history.service'
import { OrdersModule } from 'src/domain/orders/orders.module'

@Module({})
export class PublicAccountModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicAccountModule,
			imports: [
				UsersModule.forFeature(),
				MenuModule.forFeature(),
				ProductsModule.forFeature(),
				FavoritiesModule.forFeature(),
				OrdersModule.forFeature(),
			],
			controllers: [PublicAccountController],
			providers: [PublickAccountService, AccountOrderHistoryService],
		}
	}
}
