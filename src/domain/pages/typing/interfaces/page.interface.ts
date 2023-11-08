import { PageTemplate } from 'src/config/templates'
import { IContentField } from 'src/domain/content/typing'
import { Lang } from 'src/shared'

export interface IPage {
	id: number

	template: PageTemplate
	key: string

	authorId?: number

	metadata?: any

	createdAt: string
	updatedAt: string

	translations?: IPageTransation[]

	contentFields?: IContentField[]
}

export interface IPageTransation {
	id: number
	title: string
	description?: string
	pageId: number
	lang: Lang
}
