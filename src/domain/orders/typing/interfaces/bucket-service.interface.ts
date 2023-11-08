import { IProduct, IProductVariant } from 'src/domain/products/typing'

export interface IBucketService {
	getPreview(payload: IGetBucketPreviewPayload): Promise<IBucketPreview>
}

export interface IGetBucketPreviewPayload {
	items: {
		productId: number
		count?: number
		variant?: number
	}[]
}

export interface IBucketPreview {
	products: Array<
		IProduct & {
			count: number
			variant?: IProductVariant
			brutoAmount: number
			nettoAmount: number
			discountAmount: number
			discountPercent: number
			link: string
		}
	>
	brutoAmount: number
	nettoAmount: number
	discountAmount: number
}
