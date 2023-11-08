import { Lang } from 'src/shared'

export interface IContentService {
	put(payload: PutContentPayload): Promise<void>
	loadOne(params: ILoadOneParams): Promise<Record<string, any>>
}

export interface PutContentPayload {
	key: string

	parentTable: string
	parentId: number

	content: any

	authorId?: number
}

export interface ILoadOneParams {
	parentTable: string
	parentId: number
	lang: Lang
}
