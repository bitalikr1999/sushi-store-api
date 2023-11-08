import { Lang } from 'src/shared'

export interface IPostService {
	create(payload: IPostCreatePayload): Promise<void>
	update(id: number, payload: Partial<IPostCreatePayload>): Promise<void>
	delete(id: number): Promise<void>
}

export interface IPostCategoryService {
	create(payload: IPostCategoryCreatePayload): Promise<void>
	delete(id: number): Promise<void>
	update(id: number, payload: Partial<IPostCategoryCreatePayload>): Promise<void>
}

export interface IPostTypeService {
	create(payload: IPostTypeCreatePayload): Promise<void>
	update(id: number, payload: Partial<IPostTypeCreatePayload>): Promise<void>
	delete(id: number): Promise<void>
}
export interface IPostCreatePayload {
	authorId?: number
	typeId?: number
	categoiesId?: number[]

	translations?: {
		name: string
		description?: string
		lang: Lang
	}[]
}

export interface IPostTypeCreatePayload {
	authorId?: number
	postId?: number

	key?: string
	translations?: {
		lang: Lang
		name: string
		description: string
	}[]
}

export interface IPostCategoryCreatePayload {
	key?: string
	authorId?: number
	parentId?: number
	translations?: {
		lang: Lang
		name: string
		description: string
	}[]
}
