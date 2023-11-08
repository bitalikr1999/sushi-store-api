import { Inject, Injectable } from '@nestjs/common'
import { InvalidCredentialsException } from 'src/shared'
import { LoginPayloadDto, LogoutPayloadDto, RefreshTokenDto } from '../dto'
import * as _ from 'lodash'
import { ISessionsService, SESSIONS_SERVICE, SessionType } from 'src/domain/sessions/typing'
import { IUsersService, USERS_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class AppAuthService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService
	@Inject(SESSIONS_SERVICE) private readonly sessionsService: ISessionsService

	// onModuleInit() {
	// 	this.signIn({
	// 		email: 'admin@admin.com',
	// 		password: '123qqq',
	// 		deviceName: 'test',
	// 	}).then(res => console.log(res.accessToken))
	// }

	public async signIn(dto: LoginPayloadDto) {
		const user = await this.usersService.getOneByEmail(dto.email)
		if (!user) throw new InvalidCredentialsException()

		const isCorrect = await this.usersService.compareUserPassword(user.id, dto.password)
		if (!isCorrect) throw new InvalidCredentialsException()

		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
			deviceName: dto.deviceName,
			type: SessionType.App,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}

	public async logout(dto: LogoutPayloadDto) {
		await this.sessionsService.finishByToken(dto.refreshToken)
	}

	public async refreshToken(dto: RefreshTokenDto) {
		const sessions = await this.sessionsService.getSessionsByTokens([dto.refreshToken])

		if (_.isEmpty(sessions)) throw new InvalidCredentialsException()

		const user = await this.usersService.getOneBy({ id: sessions[0].userId })
		if (!user) throw new InvalidCredentialsException()

		return await this.sessionsService.refresh(dto.refreshToken)
	}
}
