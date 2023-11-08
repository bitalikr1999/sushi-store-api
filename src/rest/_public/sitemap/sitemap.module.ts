import { DynamicModule, Module } from '@nestjs/common'
import { PagesModule } from 'src/domain/pages/pages.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { UsersModule } from 'src/domain/users/users.module'
import { SitemapService } from './sitemap.service'
import { SitemapController } from './sitemap.controller'

@Module({})
export class RestSitemapModule {
	static forRoot(): DynamicModule {
		return {
			module: RestSitemapModule,
			imports: [
				PagesModule.forFeature(),
				ProductsModule.forFeature(),
				UsersModule.forFeature(),
			],
			providers: [SitemapService],
			controllers: [SitemapController],
		}
	}
}
