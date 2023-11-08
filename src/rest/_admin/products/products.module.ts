import { DynamicModule, Module } from '@nestjs/common'
import { ProductsModule } from 'src/domain/products/products.module'
import { RestProductsService } from './products.service'
import { RestAdminProductsController } from './products.controller'

@Module({})
export class RestAdminProductsModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminProductsModule,
			imports: [ProductsModule.forFeature()],
			providers: [RestProductsService],
			controllers: [RestAdminProductsController],
		}
	}
}
