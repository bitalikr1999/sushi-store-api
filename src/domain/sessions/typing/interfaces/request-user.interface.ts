import { RequestUserType } from '../enums'

export interface IRequestUser {
	userId?: number
	role?: string
	sessionId?: number

	type: RequestUserType

	fixedUserId: string
}
