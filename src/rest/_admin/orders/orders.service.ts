import { Inject, Injectable } from '@nestjs/common'
import {
	IOrderService,
	IOrdersRepository,
	ORDERS_REPOSITORY,
	ORDERS_SERVICE,
	OrderStatus,
} from 'src/domain/orders/typing'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { Brackets } from 'typeorm'
import { GetOrdersParamsDto } from './dto'
import { SHIPPING_SERVICE } from 'src/domain/shippings/typing/consts'
import { IShippingService } from 'src/domain/shippings/typing'
import { IUsersReferralsService, USERS_REFERRAL_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class RestAdminOrdersService {
	@Inject(ORDERS_SERVICE)
	private readonly ordersService: IOrderService

	@Inject(ORDERS_REPOSITORY)
	private readonly ordersRepository: IOrdersRepository

	@Inject(SHIPPING_SERVICE)
	private readonly shippingsService: IShippingService

	@Inject(USERS_REFERRAL_SERVICE)
	private readonly usersReferralsService: IUsersReferralsService

	public async getList(pagination: IPagination, dto: GetOrdersParamsDto) {
		const query = this.ordersRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.orderUser', 'orderUser')
			.leftJoinAndSelect('it.orderProducts', 'orderProducts')
			.where('it.id IS NOT NULL')

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('orderUser.name ILIKE :ss', {
						ss: prepareSearchString(pagination.searchString),
					})
					qb.orWhere('orderUser.email ILIKE :ss')
					qb.orWhere('orderUser.phoneNumber ILIKE :ss')
				}),
			)
		}

		if (dto.status) {
			query.andWhere('it.status = :status', { status: dto.status })
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return {
			items,
			count,
		}
	}

	public async getOne(id: number) {
		const order = await this.ordersRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.orderUser', 'orderUser')
			.leftJoinAndSelect('it.orderProducts', 'orderProducts')
			.leftJoinAndSelect('orderProducts.product', 'product')
			.leftJoinAndSelect('product.translations', 'productTranslations')
			.where('it.id = :id', { id })
			.getOne()

		order.shipping = await this.shippingsService.getOne(order.shippingId)

		return order
	}

	public async updateStatus(id: number, status: OrderStatus) {
		const order = await this.ordersRepository.findOne({
			where: {
				id,
			},
			relations: ['orderUser'],
		})

		if (order.status === OrderStatus.Success) return

		await this.ordersRepository.update(id, { status })

		if (status === OrderStatus.Success && order.orderUser?.userId) {
			await this.usersReferralsService.activate(order.orderUser?.userId)
		}
	}
}
