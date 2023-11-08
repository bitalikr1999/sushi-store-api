import { UserDto, UserStatus } from 'src/domain/users/typing'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class UsersListDto {
	@DtoProperty({
		isArray: true,
		type: UserDto,
	})
	items: UserDto[]

	@DtoProperty()
	count: number
}

export class GetUsersListParamsDto {
	@DtoPropertyOptional({ enum: UserStatus })
	status: UserStatus
}
