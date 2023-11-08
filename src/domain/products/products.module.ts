import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import {
	PRODUCTS_REPOSITORY,
	PRODUCTS_SERVICE,
	PRODUCTS_TRANSLATIONS_REPOSITORY,
	PRODUCTS_VARIANTS_REPOSITORY,
	PRODUCT_CATEGORIES_REPOSITORY,
	PRODUCT_CATEGORIES_SERVICE,
	PRODUCT_CATEGORIES_TRANSLATIONS_REPOSITORY,
} from './typing/consts'
import {
	Product,
	ProductCategory,
	ProductCategoryTranslation,
	ProductTranslation,
	ProductVariant,
} from './entities'
import { provideClass } from 'src/shared'
import { ProductCategoriesService } from './services'
import { ProductsService } from './services/products.service'
import { ProductsCategoriesSeed } from './seeds'
import { ProductsSeed } from './seeds/products.seed'
import { ContentModule } from '../content/content.module'
import { ProductsVariantsService } from './services/products-variants.service'

@Module({})
export class ProductsModule {
	private static getProviders() {
		return [
			provideEntity(PRODUCT_CATEGORIES_REPOSITORY, ProductCategory),
			provideEntity(PRODUCT_CATEGORIES_TRANSLATIONS_REPOSITORY, ProductCategoryTranslation),

			provideClass(PRODUCT_CATEGORIES_SERVICE, ProductCategoriesService),

			provideEntity(PRODUCTS_REPOSITORY, Product),
			provideEntity(PRODUCTS_TRANSLATIONS_REPOSITORY, ProductTranslation),

			provideEntity(PRODUCTS_VARIANTS_REPOSITORY, ProductVariant),

			ProductsVariantsService,

			provideClass(PRODUCTS_SERVICE, ProductsService),
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: ProductsModule,
			imports: [ContentModule.forFeature()],
			providers: [...this.getProviders(), ProductsCategoriesSeed, ProductsSeed],
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ProductsModule,
			providers: this.getProviders(),
			exports: [
				PRODUCT_CATEGORIES_REPOSITORY,
				PRODUCT_CATEGORIES_TRANSLATIONS_REPOSITORY,
				PRODUCT_CATEGORIES_SERVICE,
				PRODUCTS_REPOSITORY,
				PRODUCTS_TRANSLATIONS_REPOSITORY,
				PRODUCTS_SERVICE,
				PRODUCTS_VARIANTS_REPOSITORY,
			],
		}
	}
}
