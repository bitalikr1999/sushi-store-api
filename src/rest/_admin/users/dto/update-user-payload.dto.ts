import { ApiProperty } from '@nestjs/swagger'
import { UserDto, UserRole } from 'src/domain/users/typing'
import { DtoPropertyOptional } from 'src/shared'

export class UpdateUserPayloadDto {
	@DtoPropertyOptional()
	firstName: string

	@DtoPropertyOptional()
	lastName: string

	@DtoPropertyOptional()
	login: string

	@DtoPropertyOptional()
	email: string

	@DtoPropertyOptional({
		enum: UserRole,
	})
	role: UserRole
}

export class UpdateUserResultDto {
	@ApiProperty()
	user: UserDto
}
