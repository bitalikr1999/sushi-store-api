import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { InvalidCredentialsException, getEnv } from 'src/shared'
import { LoginPayloadDto, LogoutPayloadDto, RefreshTokenDto, SignUpPayloadDto } from '../dto'
import * as _ from 'lodash'
import { ISessionsService, SESSIONS_SERVICE, SessionType } from 'src/domain/sessions/typing'
import {
	IUsersReferralsService,
	IUsersRepository,
	IUsersService,
	USERS_REFERRAL_SERVICE,
	USERS_REPOSITORY,
	USERS_SERVICE,
	UserRole,
} from 'src/domain/users/typing'

@Injectable()
export class AuthService {
	@Inject(USERS_SERVICE)
	private readonly usersService: IUsersService

	@Inject(SESSIONS_SERVICE)
	private readonly sessionsService: ISessionsService

	@Inject(USERS_REPOSITORY)
	private readonly usersRepository: IUsersRepository

	@Inject(USERS_REFERRAL_SERVICE)
	private readonly usersReferralService: IUsersReferralsService

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
			expiresIn: dto.longSave && `${getEnv('JWT_LONG_SAVE_SECOND')}s`,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}

	public async logout(dto: LogoutPayloadDto) {
		await this.sessionsService.finishByToken(dto.refreshToken)
	}

	public async signUp(dto: SignUpPayloadDto) {
		const exist = await this.usersRepository.findOneBy({
			email: dto.email,
		})
		if (exist) throw new ConflictException('User exist')

		const userId = await this.usersService.create({
			role: dto.isPartnet ? UserRole.Wholesaler : UserRole.User,
			email: dto.email,
			password: dto.password,
			firstName: dto.name,
		})

		const user = await this.usersRepository.findOneBy({ id: userId })

		const referalUser = await this.usersRepository.findOneBy({ referalCode: dto.referalCode })

		if (referalUser) {
			await this.usersReferralService.add({
				invitedId: userId,
				userId: referalUser.id,
			})
		}

		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
			deviceName: '',
			type: SessionType.App,
			expiresIn: dto.remembeMe && `${getEnv('JWT_LONG_SAVE_SECOND')}s`,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}

	public async refreshToken(dto: RefreshTokenDto) {
		const sessions = await this.sessionsService.getSessionsByTokens([dto.refreshToken])

		if (_.isEmpty(sessions)) throw new InvalidCredentialsException()

		const user = await this.usersService.getOneBy({ id: sessions[0].userId })
		if (!user) throw new InvalidCredentialsException()

		return await this.sessionsService.refresh(dto.refreshToken)
	}
}
