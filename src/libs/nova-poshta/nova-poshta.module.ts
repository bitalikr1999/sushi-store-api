import { DynamicModule, Module } from '@nestjs/common'
import {
	INovaPoshtaModuleOptions,
	NOVA_POSHTA_API,
	NOVA_POSHTA_CITY_REPOSITORY,
	NOVA_POSHTA_DEPARTMENT_REPOSITORY,
	NOVA_POSHTA_OPTIONS,
} from './typing'
import { provideClass } from 'src/shared'
import { NovaPoshtaApi } from './api'
import { NPSeedService } from './services/np-seed.service'
import { provideEntity } from '../database'
import { NPCity, NPDepartment } from './entities'

@Module({})
export class NovaPoshtaModule {
	static options: INovaPoshtaModuleOptions

	static getProviders() {
		return [
			{
				useValue: this.options,
				provide: NOVA_POSHTA_OPTIONS,
			},
			provideClass(NOVA_POSHTA_API, NovaPoshtaApi),
			provideEntity(NOVA_POSHTA_CITY_REPOSITORY, NPCity),
			provideEntity(NOVA_POSHTA_DEPARTMENT_REPOSITORY, NPDepartment),
		]
	}

	static forRoot(options: INovaPoshtaModuleOptions): DynamicModule {
		this.options = options

		return {
			module: NovaPoshtaModule,
			providers: [...this.getProviders(), NPSeedService],
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: NovaPoshtaModule,
			providers: [...this.getProviders()],
			exports: [
				NOVA_POSHTA_API,
				NOVA_POSHTA_CITY_REPOSITORY,
				NOVA_POSHTA_DEPARTMENT_REPOSITORY,
			],
		}
	}
}
