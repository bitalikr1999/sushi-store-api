import { DynamicModule, Module } from '@nestjs/common'
import { OrdersModule } from 'src/domain/orders/orders.module'
import { RestPublicOrdersService } from './orders.service'
import { RestPublicOrdersController } from './orders.controller'
import { ShippingModule } from 'src/domain/shippings/shipping.module'
import { NovaPoshtaModule } from 'src/libs'
import { ProductsModule } from 'src/domain/products/products.module'
import { UsersModule } from 'src/domain/users/users.module'
import { MailerModule } from 'src/libs/mailer/mailer.module'

@Module({})
export class ApiPublicOrdersModule {
	static forRoot(): DynamicModule {
		return {
			module: ApiPublicOrdersModule,
			imports: [
				OrdersModule.forFeature(),
				ShippingModule.forFeature(),
				NovaPoshtaModule.forFeature(),
				ProductsModule.forFeature(),
				UsersModule.forFeature(),
				MailerModule.forFeature(),
			],
			providers: [RestPublicOrdersService],
			controllers: [RestPublicOrdersController],
		}
	}
}
