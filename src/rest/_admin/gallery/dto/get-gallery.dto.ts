import { Type } from 'class-transformer'
import { GalleryItemDto } from 'src/domain/galleries/dto'
import { DtoProperty } from 'src/shared'

export class GetGalleryParamsDto {
	@DtoProperty()
	parentTable: string

	@DtoProperty()
	parentId: number
}

export class GetGalleryResponseDto {
	@DtoProperty({ isArray: true, type: GalleryItemDto })
	@Type(() => GalleryItemDto)
	items: GalleryItemDto[]

	@DtoProperty()
	count: number
}
