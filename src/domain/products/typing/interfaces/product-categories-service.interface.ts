import { Lang } from 'src/shared'
import { IProductCategory } from './product-category.interface'

export interface IProductCategoriesService {
	create: (payload: CreateProductCategoryPayload) => void
	update: (id: number, payload: Partial<CreateProductCategoryPayload>) => void
	delete: (id: number) => void
	getHighRoot: (categoryId: number) => Promise<IProductCategory>
}

export interface CreateProductCategoryPayload {
	key?: string
	data?: any
	authorId?: number
	parentId?: number

	translations: {
		lang: Lang
		name: string
		description?: string
	}[]
}
