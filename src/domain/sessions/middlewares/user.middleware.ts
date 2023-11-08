import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from 'src/libs'
import { IRequestUser, ISessionsService, RequestUserType, SESSIONS_SERVICE } from '../typing'
import { removeBearerFromToken } from 'src/shared'
import * as randomstring from 'randomstring'

@Injectable()
export class UserMiddleware implements NestMiddleware {
	@Inject(SESSIONS_SERVICE)
	private readonly sessionsService: ISessionsService

	constructor(private readonly jwtService: JwtService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const userData: IRequestUser = {
			type: null,
			fixedUserId: null,
		}
		const user = await this.getAuthUser(req)

		if (user) {
			userData.userId = user.userId
			userData.type = RequestUserType.Real
			userData.sessionId = user.sessionId
			userData.role = user.role
			userData.fixedUserId = `${RequestUserType.Real}/${user.sessionId}`
		} else {
			let ownerId = req.cookies['ownerId']
			if (!ownerId) {
				ownerId = randomstring.generate(16)
				res.cookie('ownerId', ownerId)
			}
			userData.type = RequestUserType.Tempory
			userData.fixedUserId = `${RequestUserType.Tempory}/${ownerId}`
		}

		;(req as any).userData = userData

		next()
	}

	private async getAuthUser(request: Request) {
		try {
			const { headers, cookies } = request as any

			const response: any = {}
			const token = cookies.accessToken
				? cookies.accessToken
				: removeBearerFromToken(headers.authorization)

			const deprecated = await this.sessionsService.checkTokenDeprecation(token)
			if (deprecated) return null

			const decoded = this.jwtService.decodeToken(token)
			if (!decoded) return null

			response.userId = decoded.id
			response.role = decoded.role
			response.sessionId = decoded.sessionId
			return response
		} catch (e) {
			console.log(e)
			return null
		}
	}
}
