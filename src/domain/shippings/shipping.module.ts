import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import {
	SHIPPING_NOVA_POSHTA_REPOSITORY,
	SHIPPING_REPOSITORY,
	SHIPPING_SERVICE,
	SHIPPING_URK_POSHTA_REPOSITORY,
} from './typing/consts'
import { Shipping, ShippingNovaPoshta, ShippingUrkPoshta } from './entities'
import { provideClass } from 'src/shared'
import { ShippingService } from './services/shipping.service'

@Module({})
export class ShippingModule {
	static forRoot() {
		return {
			module: ShippingModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ShippingModule,
			providers: [
				provideEntity(SHIPPING_REPOSITORY, Shipping),
				provideEntity(SHIPPING_NOVA_POSHTA_REPOSITORY, ShippingNovaPoshta),
				provideEntity(SHIPPING_URK_POSHTA_REPOSITORY, ShippingUrkPoshta),
				provideClass(SHIPPING_SERVICE, ShippingService),
			],
			exports: [SHIPPING_SERVICE],
		}
	}
}
