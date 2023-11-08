import { UserRole } from 'src/domain/users/typing'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class GoogleSignInPayloadDto {
	@DtoProperty()
	idToken: string

	@DtoPropertyOptional()
	role?: UserRole

	@DtoProperty()
	deviceName: string

	// @DtoProperty()
	// serverAuthCode: string

	// @DtoPropertyOptional()
	// email: string

	// @DtoPropertyOptional()
	// givenName: string

	// @DtoPropertyOptional()
	// familyName: string

	// @DtoProperty()
	// googleuserId: string
}
