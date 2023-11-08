import { DynamicModule, Module } from '@nestjs/common'
import { RestAdminOrdersController } from './orders.controller'
import { RestAdminOrdersService } from './orders.service'
import { OrdersModule } from 'src/domain/orders/orders.module'
import { ShippingModule } from 'src/domain/shippings/shipping.module'
import { UsersModule } from 'src/domain/users/users.module'

@Module({})
export class RestAdminOrdersModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminOrdersModule,
			imports: [
				OrdersModule.forFeature(),
				ShippingModule.forFeature(),
				UsersModule.forFeature(),
			],
			providers: [RestAdminOrdersService],
			controllers: [RestAdminOrdersController],
		}
	}
}
