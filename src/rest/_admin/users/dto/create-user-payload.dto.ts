import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'
import { UserRole } from 'src/domain/users/typing'
import { DtoProperty } from 'src/shared'
import { UsersListDto } from './users-list.dto'

export class CreateUserPayloadDto {
	@DtoProperty()
	firstName: string

	@DtoProperty()
	lastName: string

	@DtoProperty()
	@IsEmail()
	email: string

	@DtoProperty()
	password: string

	@DtoProperty({
		enum: UserRole,
	})
	role: UserRole
}

export class CreateUserResultDto {
	@ApiProperty()
	user: UsersListDto
}
