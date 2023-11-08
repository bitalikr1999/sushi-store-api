import { Inject, Injectable } from '@nestjs/common'
import { InvalidCredentialsException } from 'src/shared'
import { EditAccountPayloadDto } from './dto/edit-account.dto'
import { ChangePasswordPayloadDto } from './dto/change-password.dto'
import { IRequestUser } from 'src/domain/sessions/typing'
import { BaseAccountService } from './abstract'

@Injectable()
export class PublickAccountService extends BaseAccountService {
	public async getAccount(userId: number) {
		const commonData = await this.getAccountCommonData(userId)
		return commonData
	}

	public async editAccount(userId: number, dto: EditAccountPayloadDto) {
		const account = await this.userService.getOneBy({ id: userId })
		if (!account) return

		await this.userService.update(userId, { firstName: dto.firstName, lastName: dto.lastName })
	}

	public async changePassword(userId: number, dto: ChangePasswordPayloadDto) {
		const user = await this.userService.getOneBy({ id: userId })
		if (!user) return

		const isCorrect = await this.userService.compareUserPassword(user.id, dto.oldPassword)
		if (!isCorrect) throw new InvalidCredentialsException()

		await this.userService.changeUserPassword(userId, dto.newPassword)
	}

	public async getFavorities(userData: IRequestUser) {
		const commonData = await this.getAccountCommonData(userData.userId)
		const ids = await this.favoritiesService.getIds(userData.fixedUserId)

		const products = await this.getProducts(
			{
				fixedUserId: userData.fixedUserId,
			},
			{
				limit: 100,
				page: 1,
			},
			ids,
		)

		return {
			...commonData,
			products: products.items,
		}
	}
}
