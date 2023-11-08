import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class SendFormPayloadDto {
	@DtoProperty()
	form: string

	@DtoProperty()
	content: string

	@DtoPropertyOptional()
	title?: string

	@DtoPropertyOptional()
	userName?: string

	@DtoPropertyOptional()
	userEmail?: string

	@DtoPropertyOptional()
	userPhoneNumber?: string

	@DtoProperty()
	pageUrl: string
}
