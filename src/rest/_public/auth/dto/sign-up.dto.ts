import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class SignUpPayloadDto {
	@DtoProperty()
	name: string

	@DtoProperty()
	email: string

	@DtoProperty()
	password: string

	@DtoPropertyOptional()
	isPartnet?: boolean

	@DtoPropertyOptional()
	remembeMe?: boolean

	@DtoPropertyOptional()
	referalCode?: string
}
