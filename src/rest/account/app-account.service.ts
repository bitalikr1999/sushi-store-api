import { Inject, Injectable } from '@nestjs/common'
import { IUsersService, USERS_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class AppAccountService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService

	public async getAccount(id: number) {
		const user = await this.usersService.getOneBy({ id })
		return user
	}
}
