import { IsString } from 'class-validator'
import { DtoProperty } from 'src/shared'

export class RefreshTokenDto {
	@DtoProperty()
	@IsString()
	refreshToken: string
}
