import { DtoPropertyOptional } from 'src/shared'

export class GetProductsPageParams {
	@DtoPropertyOptional()
	subCategories?: string //split by comma

	@DtoPropertyOptional()
	priceFrom?: string

	@DtoPropertyOptional()
	priceTo?: string

	fixedUserId?: string
	withDiscount?: boolean
}
