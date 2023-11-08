import { DynamicModule, Module } from '@nestjs/common'
import { ContentModule } from 'src/domain/content/content.module'
import { AdminContentService } from './content.service'
import { AdminContentController } from './content.controller'
import { ProductsModule } from 'src/domain/products/products.module'

@Module({})
export class AdminRestContentModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminRestContentModule,
			imports: [ContentModule.forFeature(), ProductsModule.forFeature()],
			providers: [AdminContentService],
			controllers: [AdminContentController],
		}
	}
}
