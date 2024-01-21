import { ProductDto } from 'src/domain/products/typing'
import { DtoPropertyOptional } from 'src/shared'

export class GetProductsParamsDto {
	@DtoPropertyOptional()
	categoryKey?: string

	@DtoPropertyOptional()
	withDiscount?: boolean

	@DtoPropertyOptional()
	sort?: 'default' | 'price-desc' | 'price-asc'
}

export class GetProductsListItem extends ProductDto {
	@DtoPropertyOptional()
	content: any
}
