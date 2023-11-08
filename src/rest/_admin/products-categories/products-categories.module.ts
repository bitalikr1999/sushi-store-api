import { DynamicModule, Module } from '@nestjs/common'
import { ProductsModule } from 'src/domain/products/products.module'
import { RestProductsCategoriesService } from './products-categories.service'
import { AdminProductsCategoriesController } from './products-categories.controller'

@Module({})
export class RestAdminProductCategoriesModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminProductCategoriesModule,
			imports: [ProductsModule.forFeature()],
			providers: [RestProductsCategoriesService],
			controllers: [AdminProductsCategoriesController],
		}
	}
}
