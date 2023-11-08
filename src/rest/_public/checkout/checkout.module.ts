import { DynamicModule, Module } from '@nestjs/common'
import { MenuModule } from 'src/domain/menu/menu.module'
import { OrdersModule } from 'src/domain/orders/orders.module'
import { CheckoutService } from './checkout.service'
import { PublicCheckoutController } from './checkout.controller'
import { ProductsModule } from 'src/domain/products/products.module'
import { UsersModule } from 'src/domain/users/users.module'

@Module({})
export class PublicCheckoutModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicCheckoutModule,
			imports: [
				MenuModule.forFeature(),
				OrdersModule.forFeature(),
				ProductsModule.forFeature(),
				UsersModule.forFeature(),
			],
			providers: [CheckoutService],
			controllers: [PublicCheckoutController],
		}
	}
}
