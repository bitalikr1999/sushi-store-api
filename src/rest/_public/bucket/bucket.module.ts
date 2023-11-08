import { DynamicModule, Module } from '@nestjs/common'
import { ProductsModule } from 'src/domain/products/products.module'
import { RestPublicBucketService } from './bucket.service'
import { RestPublicBucketController } from './bucket.controller'
import { SettingsModule } from 'src/domain/settings/settings.module'
import { OrdersModule } from 'src/domain/orders/orders.module'

@Module({})
export class PublicBucketModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicBucketModule,
			imports: [
				ProductsModule.forFeature(),
				SettingsModule.forFeature(),
				OrdersModule.forFeature(),
			],
			providers: [RestPublicBucketService],
			controllers: [RestPublicBucketController],
		}
	}
}
