import { DynamicModule, Module } from '@nestjs/common'
import { RestNovaPoshtaService } from './nova-poshta.service'
import { RestNovaPoshtaController } from './nova-poshta.controller'
import { NovaPoshtaModule } from 'src/libs'

@Module({})
export class RestNovaPoshtaModule {
	static forRoot(): DynamicModule {
		return {
			module: RestNovaPoshtaModule,
			imports: [NovaPoshtaModule.forFeature()],
			providers: [RestNovaPoshtaService],
			controllers: [RestNovaPoshtaController],
		}
	}
}
