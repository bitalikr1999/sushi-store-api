import { Body, Controller, Post } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { TokenPairDto } from 'src/domain/sessions/typing'
import { LoginPayloadDto, LogoutPayloadDto, RefreshTokenDto } from '../dto'
import { AppAuthService } from '../services'

@ApiTags('Common | Auth')
@Controller('auth')
export class AppAuthController {
	constructor(private readonly appAuthService: AppAuthService) {}

	@ApiOperation({ summary: 'User login' })
	@ApiBody({ type: LoginPayloadDto })
	@ApiResponse({
		status: 201,
		description: 'Start session, returns access and refresh tokens',
		type: TokenPairDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid credentials',
	})
	@Post()
	public async login(@Body() dto: LoginPayloadDto) {
		return await this.appAuthService.signIn(dto)
	}

	@ApiOperation({ summary: 'User logout' })
	@ApiBody({ type: LogoutPayloadDto })
	@AuthGuard()
	@ApiResponse({
		status: 201,
		description: 'Close user session',
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
	})
	@Post('logout')
	public async logout(@Body() dto: LogoutPayloadDto) {
		await this.appAuthService.logout(dto)
	}

	@ApiOperation({ summary: 'Refresh user session' })
	@ApiResponse({
		status: 201,
		description: 'Refresh session, returns new access and refresh tokens',
		type: TokenPairDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid credentials',
	})
	@Post('refresh-token')
	public async refreshToken(@Body() dto: RefreshTokenDto) {
		return await this.appAuthService.refreshToken(dto)
	}
}
