import { IOrderUser } from './order.interface'

export interface IOrdersUsersService {
	getOrCreate(payload: GetOrCreateOrderUserPayload): Promise<IOrderUser>
}

export interface GetOrCreateOrderUserPayload {
	email?: string
	phoneNumber: string
	name: string
	userId?: number
	fixedUserId?: string
}
