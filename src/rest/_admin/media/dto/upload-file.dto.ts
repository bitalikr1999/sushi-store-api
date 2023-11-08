import { DtoProperty } from 'src/shared'

export class GetLinkToUploadFileDto {
	@DtoProperty()
	filename: string

	@DtoProperty()
	type: string
}

export class FinishFileUploadDto {
	@DtoProperty()
	uploadId: string
}
