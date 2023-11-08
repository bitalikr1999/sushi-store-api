import { IProductVariant, ProductDto } from 'src/domain/products/typing'
import { DtoProperty } from 'src/shared'

class Item {
	productId: number
	count?: number
	options?: any
}

export class GetBucketPreviewDto {
	@DtoProperty({ isArray: true, type: Item })
	items: Item[]
}

export class BucketPreviewDto {
	@DtoProperty()
	products: Array<
		ProductDto & {
			count: number
			variant?: IProductVariant
			brutoAmount: number
			nettoAmount: number
			discountAmount: number
			link: string
		}
	>

	@DtoProperty()
	brutoAmount: number

	@DtoProperty()
	nettoAmount: number

	@DtoProperty()
	discountAmount: number
}
