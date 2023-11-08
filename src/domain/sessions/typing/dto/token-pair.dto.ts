import { DtoProperty } from 'src/shared'

export class TokenPairDto {
	@DtoProperty()
	accessToken: string

	@DtoProperty()
	refreshToken: string
}
