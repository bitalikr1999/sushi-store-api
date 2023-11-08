import { Inject, Injectable } from '@nestjs/common'
import { ORDERS_PRODUCTS_REPOSITORY, ORDERS_REPOSITORY } from '../typing/consts'
import {
	CreateOrderPayload,
	IOrder,
	IOrderService,
	IOrdersProductsRepository,
	IOrdersRepository,
	OrderStatus,
} from '../typing'
import { OrdersUsersService } from './orders-users.service'
import {
	IProductVariant,
	IProductsRepository,
	IProductsVariantsRepository,
	PRODUCTS_REPOSITORY,
	PRODUCTS_VARIANTS_REPOSITORY,
} from 'src/domain/products/typing'

import { cloneDeep } from 'lodash'
import { Lang, formatPrice, getTranslate } from 'src/shared'
import { transformFileUrl } from 'src/shared/transforms'
import * as moment from 'moment'

@Injectable()
export class OrdersService implements IOrderService {
	@Inject(ORDERS_REPOSITORY)
	private readonly ordersRepository: IOrdersRepository

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(ORDERS_PRODUCTS_REPOSITORY)
	private readonly orderProductsRepository: IOrdersProductsRepository

	@Inject(PRODUCTS_VARIANTS_REPOSITORY)
	private readonly productsVariantsRepository: IProductsVariantsRepository

	constructor(private readonly ordersUsersService: OrdersUsersService) {}

	public async create(payload: CreateOrderPayload) {
		const orderUser = await this.ordersUsersService.getOrCreate(payload.user)

		const order = await this.ordersRepository.save({
			status: OrderStatus.New,
			orderUserId: orderUser.id,
			currency: payload.currency,
			shippingId: payload.shippingId,
			comment: payload.comment,
			usedBonuses: payload.usedBonuses,
		})

		await this.putProducts(order.id, payload.products)

		return order
	}

	private async putProducts(orderId: number, payloadProducts: CreateOrderPayload['products']) {
		const toSave: any[] = []
		await Promise.all(
			payloadProducts.map(async it => {
				const product = await this.productsRepository.findOne({
					where: { id: it.productId },
				})

				if (!product) return null

				toSave.push({
					orderId,
					productId: it.productId,
					price: product.price,
					count: it.count,
					discount: it.discount,
				})
			}),
		)

		await this.orderProductsRepository.insert(toSave)
	}

	public async prepareOrder(order: IOrder) {
		const result: any = {
			...cloneDeep(order),
			createdAt: moment(order.createdAt).format('DD.MM.YYYY'),
			orderProducts: [],
			brutoAmount: 0,
			nettoAmount: 0,
			discountAmount: 0,
		}

		for await (const item of order.orderProducts) {
			let brutoAmount = 0
			let nettoAmount = 0
			let discountAmount = 0
			let discountPercent = 0

			const product = await this.productsRepository.findOne({
				where: { id: item.productId },
				relations: ['previewMedia', 'translations'],
			})

			product.translate = getTranslate(product.translations, Lang.uk)
			product.translations = null
			product.previewMedia.path = transformFileUrl(product.previewMedia.url)

			brutoAmount = formatPrice(Number(item.price) * Number(item.count))
			discountPercent = item.discount
			discountAmount = formatPrice((discountPercent * brutoAmount) / 100)
			nettoAmount = formatPrice(brutoAmount - discountAmount)

			result.brutoAmount += brutoAmount
			result.nettoAmount += nettoAmount
			result.discountAmount += discountAmount

			let variant: IProductVariant = null

			try {
				if (item.productVariantId) {
					variant = await this.productsVariantsRepository.findOneBy({
						id: item.productVariantId,
					})
				}
			} catch (e) {}

			result.orderProducts.push({
				...product,
				count: item.count,
				brutoAmount,
				nettoAmount,
				discountAmount,
				discountPercent,
				variant,
				link: `/products/single/${product.key}`,
			})
		}

		return result
	}
}
