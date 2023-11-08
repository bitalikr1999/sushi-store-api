import { Type } from 'class-transformer'
import { DtoProperty } from 'src/shared'

class PutGalleryItemPayloadDto {
	@DtoProperty()
	mediaId: number

	@DtoProperty()
	order: number

	@DtoProperty()
	data?: any
}
export class PutGalleryPaylodDto {
	@DtoProperty()
	parentTable: string

	@DtoProperty()
	parentId: number

	@DtoProperty({ isArray: true, type: PutGalleryItemPayloadDto })
	@Type(() => PutGalleryItemPayloadDto)
	items: PutGalleryItemPayloadDto[]
}
