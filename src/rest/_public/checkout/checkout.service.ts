import { Inject, Injectable } from '@nestjs/common'
import {
	IOrdersRepository,
	IOrdersUsersRepository,
	ORDERS_REPOSITORY,
	ORDERS_USERS_REPOSITORY,
} from 'src/domain/orders/typing'
import { IRequestUser } from 'src/domain/sessions/typing'
import { PublicService } from 'src/shared'

@Injectable()
export class CheckoutService extends PublicService {
	@Inject(ORDERS_USERS_REPOSITORY)
	private readonly ordersUsersRepository: IOrdersUsersRepository

	@Inject(ORDERS_REPOSITORY)
	private readonly ordersRepository: IOrdersRepository

	public async getCheckoutPageData(userData: IRequestUser) {
		const commonData = await this.getCommonData(userData?.userId)

		const prefilData: Record<string, any> = {
			name: null,
			email: null,
			phoneNumber: null,
			shippingType: null,
		}

		const orderUser = await this.ordersUsersRepository
			.createQueryBuilder('it')
			.where('it.userId = :userId', { userId: userData.userId })
			.orWhere('it.fixedUserId = :fixedUserId', { fixedUserId: userData.fixedUserId })
			.getOne()

		if (orderUser) {
			prefilData.name = orderUser.name
			prefilData.email = orderUser.email
			prefilData.phoneNumber = orderUser.phoneNumber

			const order = await this.ordersRepository
				.createQueryBuilder('it')
				.where('it.orderUserId = :orderUserId', { orderUserId: orderUser.id })
				.leftJoinAndSelect('it.shipping', 'shipping')
				.leftJoinAndSelect('shipping.urkPoshtaData', 'urkPoshtaData')
				.leftJoinAndSelect('shipping.novaPoshtaData', 'novaPoshtaData')
				.orderBy('it.createdAt', 'DESC')
				.getOne()

			if (order && order.shipping) {
				prefilData.shippingType = order.shipping.type

				try {
					if (order.shipping.novaPoshtaData[0]) {
						const novaPoshtaData = order.shipping.novaPoshtaData[0]
						prefilData.npTown = novaPoshtaData.town
						prefilData.npRegion = novaPoshtaData.region
						prefilData.npTownId = novaPoshtaData.townId
						prefilData.npDepartmentName = novaPoshtaData.departmentName
						prefilData.npDepartmentCode = novaPoshtaData.departmentCode
						prefilData.npDepartmentId = novaPoshtaData.de
						prefilData.isShippingNP = true
					}
					if (order.shipping.urkPoshtaData[0]) {
						const urkPoshtaData = order.shipping.urkPoshtaData[0]
						prefilData.upTown = urkPoshtaData.town
						prefilData.upDepartmentAddress = urkPoshtaData.departmentAddress
						prefilData.isShippingUKR = true
					}
				} catch (e) {}
			}
		} else if (commonData.user) {
			prefilData.name = `${commonData.user.firstName} ${commonData.user.lastName}`
			prefilData.email = commonData.user.email
		}

		console.log(prefilData)
		return {
			...commonData,
			prefilData,
		}
	}
}
