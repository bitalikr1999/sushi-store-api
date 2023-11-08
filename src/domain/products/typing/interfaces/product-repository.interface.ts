import { Repository } from 'typeorm'
import { IProductCategory, IProductCategoryTranslation } from './product-category.interface'
import { IProduct, IProductTranslation } from './product.interface'
import { IProductVariant } from './products-variants.interface'

export type IProductsCategoriesRepository = Repository<IProductCategory>
export type IProductsCategoriesTranslationsRepository = Repository<IProductCategoryTranslation>

export type IProductsRepository = Repository<IProduct>
export type IProductsTranslationsRepository = Repository<IProductTranslation>

export type IProductsVariantsRepository = Repository<IProductVariant>
