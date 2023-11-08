import { IMedia } from 'src/domain/media/typing'
import { GalleryItemDto } from '../dto'

export interface IGalleryModel {
	id: number

	mediaId: number
	parentTable: string
	parentId: number
	order: number
	data?: any

	createdAt: string
	updatedAt: string

	media?: IMedia
}

export interface IGalleryService {
	put(dto: IStoreGalleryPayload): Promise<void>
	delete(id: number): Promise<void>
	get(dto: IGetGalleryParams): Promise<GalleryItemDto[]>
}

export interface IStoreGalleryPayload {
	parentTable: string
	parentId: number
	items: {
		mediaId: number
		order: number
		data?: any
	}[]
}

export interface IGetGalleryParams {
	parentTable: string
	parentId: number
}
