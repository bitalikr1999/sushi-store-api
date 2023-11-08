import { IsString } from 'class-validator'
import { DtoProperty } from 'src/shared'

export class LogoutPayloadDto {
	@DtoProperty()
	@IsString()
	refreshToken: string
}
