import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ReqUser } from 'src/shared'
import { AppAccountService } from './app-account.service'

@ApiTags('Account')
@Controller('app/account')
export class AppAccountController {
	constructor(private readonly appAccountService: AppAccountService) {}

	@ApiOperation({ summary: 'Get user account' })
	@ApiResponse({
		status: 201,
		description: 'return user data',
	})
	@AuthGuard()
	@Get()
	public getAccount(@ReqUser() id: number) {
		return this.appAccountService.getAccount(id)
	}
}
