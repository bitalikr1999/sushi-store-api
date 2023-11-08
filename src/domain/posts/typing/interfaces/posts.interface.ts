import { PageTemplate } from 'src/config/templates'
import { Lang } from 'src/shared'

export interface IPost {
	id: number

	template: PageTemplate
	authorId?: number

	typeId?: number

	postToCategories?: IPostToCategory[]

	createdAt?: string
	updatedAt?: string
}

export interface IPostToCategory {
	id: number
	postId: number
	categoryId: number

	category?: IPostCategory

	createdAt: string
	updatedAt: string
}

export interface IPostType {
	id: number

	authorId?: number
	key: string

	createdAt?: string
	updatedAt?: string
}

export interface IPostCategory {
	id: number

	key: string
	authorId?: number
	parentId?: number

	createdAt?: string
	updatedAt?: string
}

export interface IPostTranslation {
	id: number

	lang: Lang
	title: string
	postId: number
	description: string
}

export interface IPostCategoryTranslation {
	id: number

	lang: Lang
	name: string
	categoryId: number
	description: string
}

export interface IPostTypeTranslation {
	id: number

	lang: Lang
	name: string
	typeId: number
	description: string
}
