import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class EditAccountPayloadDto {
	@DtoPropertyOptional()
	firstName: string

	@DtoPropertyOptional()
	lastName: string
}
