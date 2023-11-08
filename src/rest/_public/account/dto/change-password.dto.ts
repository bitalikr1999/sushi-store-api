import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class ChangePasswordPayloadDto {
	@DtoProperty()
	oldPassword: string

	@DtoProperty()
	newPassword: string
}
