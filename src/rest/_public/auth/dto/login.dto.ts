import { IsString } from 'class-validator'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class LoginPayloadDto {
	@DtoProperty()
	@IsString()
	email: string

	@DtoProperty()
	@IsString()
	password: string

	@DtoProperty()
	@IsString()
	deviceName: string

	@DtoPropertyOptional()
	longSave?: boolean
}
