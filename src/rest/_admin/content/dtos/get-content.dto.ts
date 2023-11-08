import { DtoProperty } from 'src/shared'

export class GetContentParamsDto {
	@DtoProperty()
	parentTable: string

	@DtoProperty()
	parentId: number
}
