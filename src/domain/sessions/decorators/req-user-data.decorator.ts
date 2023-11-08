import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IRequestUser } from '../typing'

export const ReqUserData = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): IRequestUser => {
		const request = ctx.switchToHttp().getRequest()

		return request.userData || null
	},
)
