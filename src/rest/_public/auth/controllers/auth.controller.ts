import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response, Request } from 'express'
import { TokenPairDto } from 'src/domain/sessions/typing'
import { LoginPayloadDto, LogoutPayloadDto, RefreshTokenDto, SignUpPayloadDto } from '../dto'
import { AuthService } from '../services'

@ApiTags('Publick | Auth')
@Controller('publick/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

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
	public async login(@Body() dto: LoginPayloadDto, @Res() res: Response) {
		const { accessToken } = await this.authService.signIn(dto)
		res.cookie('accessToken', accessToken, {
			expires: dto.longSave && new Date(Date.now() + 1 * 24 * 60 * 1000),
		}).send({ message: 'ok' })
	}

	@ApiOperation({ summary: 'User register' })
	@ApiBody({ type: LoginPayloadDto })
	@ApiResponse({
		status: 201,
		description: 'Start session, returns access and refresh tokens',
		type: TokenPairDto,
	})
	@Post('sign-up')
	public async register(@Body() dto: SignUpPayloadDto, @Res() res: Response) {
		const { accessToken } = await this.authService.signUp(dto)
		res.cookie('accessToken', accessToken, {
			expires: dto.remembeMe && new Date(Date.now() + 1 * 24 * 60 * 1000),
		}).send({ message: 'ok' })
	}

	@ApiOperation({ summary: 'User logout' })
	@ApiBody({ type: LogoutPayloadDto })
	@ApiResponse({
		status: 201,
		description: 'Close user session',
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized',
	})
	@Get('logout')
	public async logout(@Req() req: Request, @Res() res: Response) {
		console.log('logout')
		await this.authService.logout({ refreshToken: req.cookies['accessToken'] })
		console.log('cleaer')
		res.clearCookie('accessToken').redirect('/')
		res.redirect('/')
	}
}
