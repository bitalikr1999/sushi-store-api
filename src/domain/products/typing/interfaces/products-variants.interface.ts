export interface IProductVariant {
	id: number
	productId: number

	previewMediaId?: number
	name: string
	description?: string
}

export interface IProductsVariantsService {
	put(productId: number, items: IPutProductVariantPayload[]): Promise<void>
}

export interface IPutProductVariantPayload {
	id?: number

	previewMediaId?: number
	name: string
	description?: string
}
