import { Inject, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import {
	IOrderService,
	IOrdersRepository,
	IOrdersUsersRepository,
	ORDERS_REPOSITORY,
	ORDERS_SERVICE,
	ORDERS_USERS_REPOSITORY,
	OrderPaymentMethod,
	OrderStatus,
} from 'src/domain/orders/typing'
import { IRequestUser } from 'src/domain/sessions/typing'
import { ShippingType } from 'src/domain/shippings/typing'
import { BaseAccountService } from './abstract'

const statusLabels = {
	[OrderStatus.New]: 'В роботі',
	[OrderStatus.InProgress]: 'В роботі',
	[OrderStatus.Delivery]: 'Доставка',
	[OrderStatus.CancelByUser]: 'Відмова користувача',
	[OrderStatus.Reject]: 'Відмова',
	[OrderStatus.Success]: 'Завершений',
}
@Injectable()
export class AccountOrderHistoryService extends BaseAccountService {
	@Inject(ORDERS_REPOSITORY)
	private readonly ordersRepository: IOrdersRepository

	@Inject(ORDERS_USERS_REPOSITORY)
	private readonly ordersUsersRepository: IOrdersUsersRepository

	@Inject(ORDERS_SERVICE)
	private readonly ordersService: IOrderService

	public async get(userData: IRequestUser) {
		const commonData = await this.getAccountCommonData()

		const ids = await this.getOrdersIds(userData.userId)

		const list = await this.getList(ids)

		return {
			...commonData,
			...list,
		}
	}

	private async getOrdersIds(userId: number) {
		const result = await this.ordersUsersRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.orders', 'order')
			.select('order.id', 'orderId')
			.where('it.userId = :userId', { userId })
			.getRawMany()

		return result.map(it => it.orderId)
	}

	public async getList(includesIds: number[]) {
		const query = this.ordersRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.orderUser', 'orderUser')
			.leftJoinAndSelect('it.orderProducts', 'orderProducts')
			.leftJoinAndSelect('it.shipping', 'shipping')
			.where('it.id = ANY(:includesIds)', { includesIds })

		const items: any = await query.getMany()

		for await (const [index, order] of items.entries()) {
			items[index] = await this.ordersService.prepareOrder(order)

			items[index].isNPDelivery = order.shipping?.type === ShippingType.NovaPoshta
			items[index].paymentLabel =
				order.paymentMethod === OrderPaymentMethod.Online
					? 'Безготівковий розрахунок'
					: 'Оплата при отриманні'

			items[index].statusLabel = statusLabels[order.status]
			items[index].createdAtLabel = moment(order.createdAt).format('MM.DD.YYYY')
		}

		return {
			items,
			count: items.length,
		}
	}
}
