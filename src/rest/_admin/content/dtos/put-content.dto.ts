import { DtoProperty } from 'src/shared'

export class PutContentPayloadDto {
	@DtoProperty()
	key: string

	@DtoProperty()
	parentTable: string

	@DtoProperty()
	parentId: number

	@DtoProperty()
	content: any
}
