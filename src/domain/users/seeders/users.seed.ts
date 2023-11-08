import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { IUsersService, USERS_SERVICE, UserRole } from '../typing'

@Injectable()
export class UsersSeed extends Seeder {
	protected name = 'Admin user'

	@Inject(USERS_SERVICE) private usersService: IUsersService
	constructor() {
		super()
	}
	protected async seed(): Promise<void> {
		console.log('SEED START')

		await this.usersService.create({
			role: UserRole.Admin,
			email: 'admin@admin.com',
			password: '123qqq',
		})
	}
}
