import { Body, Controller, Get, Patch, Res, UseFilters } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard, ReqUserData } from 'src/domain/sessions/decorators'
import { ReqUser, ViewAuthFilter } from 'src/shared'
import { PublickAccountService } from './account.service'
import { EditAccountPayloadDto } from './dto'
import { ChangePasswordPayloadDto } from './dto/change-password.dto'
import { IRequestUser } from 'src/domain/sessions/typing'
import { AccountOrderHistoryService } from './account-order-history.service'

@Controller('account')
export class PublicAccountController {
	constructor(
		private readonly publickAccountService: PublickAccountService,
		private readonly accountOrderHistoryService: AccountOrderHistoryService,
	) {}

	@AuthGuard()
	@UseFilters(ViewAuthFilter)
	@Get('')
	public async get(@ReqUser() userId: number, @Res() res: Response) {
		try {
			const data = await this.publickAccountService.getAccount(userId)
			return res.render('pages/account/settings', data)
		} catch (e) {
			console.log('e', e)
		}
	}

	@AuthGuard()
	@UseFilters(ViewAuthFilter)
	@Get('bonuses')
	public async getBonuses(@ReqUser() userId: number, @Res() res: Response) {
		try {
			const data = await this.publickAccountService.getAccount(userId)
			return res.render('pages/account/bonuses', data)
		} catch (e) {
			console.log('e', e)
		}
	}

	@AuthGuard()
	@UseFilters(ViewAuthFilter)
	@Get('orders-history')
	public async getOrders(@ReqUserData() userData: IRequestUser, @Res() res: Response) {
		try {
			const data = await this.accountOrderHistoryService.get(userData)
			return res.render('pages/account/order-history', data)
		} catch (e) {
			console.log('e', e)
		}
	}

	@AuthGuard()
	@UseFilters(ViewAuthFilter)
	@Get('favorities')
	public async getFavorities(@ReqUserData() userData: IRequestUser, @Res() res: Response) {
		try {
			const data = await this.publickAccountService.getFavorities(userData)
			return res.render('pages/account/favorities', data)
		} catch (e) {
			console.log('e', e)
		}
	}

	@AuthGuard()
	@Patch('edit')
	public async edit(@ReqUser() userId: number, @Body() dto: EditAccountPayloadDto) {
		return this.publickAccountService.editAccount(userId, dto)
	}

	@AuthGuard()
	@Patch('password')
	public async changePassword(@ReqUser() userId: number, @Body() dto: ChangePasswordPayloadDto) {
		return this.publickAccountService.changePassword(userId, dto)
	}
}
