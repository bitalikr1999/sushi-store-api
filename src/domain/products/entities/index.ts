import { ProductCategoryTranslation } from './product-category-translation.entity'
import { ProductCategory } from './product-category.entity'
import { ProductTranslation } from './product-translation.entity'
import { ProductVariant } from './product-variants.entity'
import { Product } from './product.entity'

export const PRODUCTS_ENTITIES = [
	ProductCategory,
	ProductCategoryTranslation,
	Product,
	ProductTranslation,
	ProductVariant,
]

export { ProductCategory, ProductCategoryTranslation, Product, ProductTranslation, ProductVariant }
