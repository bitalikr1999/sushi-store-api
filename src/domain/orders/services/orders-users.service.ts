import { Inject, Injectable } from '@nestjs/common'
import {
	GetOrCreateOrderUserPayload,
	IOrderUser,
	IOrdersUsersRepository,
	IOrdersUsersService,
	ORDERS_USERS_REPOSITORY,
} from '../typing'

@Injectable()
export class OrdersUsersService implements IOrdersUsersService {
	@Inject(ORDERS_USERS_REPOSITORY)
	private readonly ordersUsersRepository: IOrdersUsersRepository

	public async getOrCreate(payload: GetOrCreateOrderUserPayload): Promise<IOrderUser> {
		const data = {
			email: payload.email,
			phoneNumber: payload.phoneNumber,
			name: payload.name,
			userId: payload.userId,
			fixedUserId: payload.fixedUserId,
		}
		let orderUser = await this.ordersUsersRepository.findOne({ where: data })
		if (!orderUser) {
			orderUser = await this.ordersUsersRepository.save(data)
		}

		return orderUser
	}
}
