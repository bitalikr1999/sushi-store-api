import { PageTemplate } from 'src/config/templates'
import { Lang } from 'src/shared'
import { IPage } from './page.interface'

export interface IPageService {
	create(payload: CreatePagePayload): Promise<IPage>
	update(id: number, payload: UpdatePagePayload): Promise<IPage>
	remove(id: number): Promise<void>
}

export interface CreatePagePayload {
	template: PageTemplate
	key: string

	authorId?: number

	metadata?: any

	translations?: IStorePageTranslationPayload[]
}

export interface UpdatePagePayload {
	template?: PageTemplate
	key?: string

	metadata?: any

	translations?: IStorePageTranslationPayload[]
}

export interface IStorePageTranslationPayload {
	lang: Lang
	title: string
	description?: string
}
