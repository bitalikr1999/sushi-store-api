import { DtoProperty, DtoPropertyOptional } from 'src/shared'
import { UserRole } from '../enums'

export class UserShortInfoDto {
	@DtoProperty()
	id: number

	@DtoPropertyOptional({ enum: UserRole })
	role?: UserRole

	@DtoPropertyOptional()
	firstName?: string

	@DtoPropertyOptional()
	lastName?: string

	@DtoPropertyOptional()
	avatarUrl?: string
}

export class UserDto extends UserShortInfoDto {}
