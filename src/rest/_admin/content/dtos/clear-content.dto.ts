import { DtoProperty } from 'src/shared'

export class ClearContentPayload {
	@DtoProperty()
	parentTable: string

	@DtoProperty()
	parentId: number
}
