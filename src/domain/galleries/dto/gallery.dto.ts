import { DtoProperty } from 'src/shared'

export class GalleryItemDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	createdAt: string

	@DtoProperty()
	fileUrl: string

	@DtoProperty()
	mediaId: number

	@DtoProperty()
	order: number
}
