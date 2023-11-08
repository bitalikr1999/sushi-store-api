import { UserDto } from 'src/domain/users/typing'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class UserFullDetailsDto extends UserDto {
	@DtoPropertyOptional()
	bonusesHistory: any[]
}
