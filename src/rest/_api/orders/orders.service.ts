import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	BUCKET_SERVICE,
	IBucketService,
	IOrderService,
	IOrdersRepository,
	ORDERS_REPOSITORY,
	ORDERS_SERVICE,
} from 'src/domain/orders/typing'
import { CreateOrderPayloadDto, OrderShippingPayloadDto } from './dto'
import { SHIPPING_SERVICE } from 'src/domain/shippings/typing/consts'
import { IShippingCreatePayload, IShippingService, ShippingType } from 'src/domain/shippings/typing'
import { INovaPoshtaApi, NOVA_POSHTA_API } from 'src/libs'
import { IProductsRepository, PRODUCTS_REPOSITORY } from 'src/domain/products/typing'
import { IRequestUser } from 'src/domain/sessions/typing'
import { IUsersService, USERS_SERVICE } from 'src/domain/users/typing'
import { IMailerService, MAILER_SERVICE } from 'src/libs/mailer/typing'
import { linksConfig } from 'src/config/links.config'
import { Currency } from 'src/shared'
import { defaultTo } from 'lodash'

@Injectable({})
export class RestPublicOrdersService {
	@Inject(ORDERS_SERVICE)
	private readonly ordersService: IOrderService

	@Inject(SHIPPING_SERVICE)
	private readonly shippingService: IShippingService

	@Inject(NOVA_POSHTA_API)
	private readonly novaPoshtaApi: INovaPoshtaApi

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(BUCKET_SERVICE)
	private readonly bucketService: IBucketService

	@Inject(USERS_SERVICE)
	private readonly usersService: IUsersService

	@Inject(MAILER_SERVICE)
	private readonly mailerService: IMailerService

	@Inject(ORDERS_REPOSITORY)
	private readonly ordersRepository: IOrdersRepository

	public async create(dto: CreateOrderPayloadDto, user: IRequestUser) {
		await this.validateCreateOrderPayload(dto)

		const bucket = await this.bucketService.getPreview({ items: dto.products })

		const shipping = await this.createShipping(dto.shipping)

		if (user.userId) {
			dto.user.userId = user.userId

			if (dto.usedBonuses) {
				await this.usersService.useBonuses(user.userId, {
					bonuses: dto.usedBonuses,
					reason: 'Використано для знижки за замовлення ',
				})
			}
		} else {
			dto.usedBonuses = 0
		}
		dto.user.fixedUserId = user.fixedUserId

		let comment = `${dto.comment}`
		if (dto.deliveryToTime) {
			comment = `Доставка на обраний час: ${dto.deliveryToTime} \n ${defaultTo(comment, '')}`
		}

		const order = await this.ordersService.create({
			currency: Currency.UAH,
			user: dto.user,
			products: bucket.products.map(item => {
				return {
					productId: item.id,
					count: item.count,
					discount: item.discountPercent,
					productVariantId: item.variant?.id,
				}
			}),
			shippingId: shipping.id,
			comment: comment,
			usedBonuses: dto.usedBonuses,
		})

		this.actionAfterCreateOrder(order.id)

		return order.id
	}

	private async createShipping(dto: OrderShippingPayloadDto) {
		const result: IShippingCreatePayload = {
			countryCode: dto.countryCode,
			addressLine: dto.addressLine,
			type: dto.type,
		}

		if (dto.type === ShippingType.NovaPoshta) {
			if (dto.novaPoshtaData.novaPoshtaDataDepartmentRef) {
				const warehouseData = await this.novaPoshtaApi.getWarehouseData(
					dto.novaPoshtaData.novaPoshtaDataDepartmentRef,
				)
				result.novaPoshtaData = {
					region: warehouseData.SettlementAreaDescription,
					town: warehouseData.SettlementDescription,
					departmentName: warehouseData.Description,
					departmentCode: warehouseData.Number,
				}
			} else {
				result.novaPoshtaData = {
					region: dto.novaPoshtaData.region,
					town: dto.novaPoshtaData.town,
					departmentCode: dto.novaPoshtaData.departmentCode,
					departmentName: dto.novaPoshtaData.departmentName,
				}
			}
		}

		if (dto.type === ShippingType.UkrPoshta) {
			result.ukrPoshtaData = {
				town: dto.ukrPoshtaData.town,
				departmentAddress: dto.ukrPoshtaData.departmentAddress,
			}
		}

		return this.shippingService.create(result)
	}

	private async prepareOrderProducts(payload: CreateOrderPayloadDto['products']) {
		return await Promise.all(
			payload.map(async item => {
				const product = await this.productsRepository.findOneBy({ id: item.productId })
				return {
					productId: item.productId,
					count: item.count,
					discount: product.discount,
					productVariantId: item.productVariantId,
				}
			}),
		)
	}

	private async validateCreateOrderPayload(dto: CreateOrderPayloadDto) {
		await Promise.all(
			dto.products.map(async item => {
				const product = await this.productsRepository.findOneBy({ id: item.productId })
				if (!product) throw new NotFoundException('Product not found')
			}),
		)
	}

	private async actionAfterCreateOrder(orderId: number) {
		await this.mailerService.send({
			subject: 'Нове замовлення',
			text: `<a href="${linksConfig.adminOrder(
				orderId,
			)}"> На сайті було створенно нове замовлення. </a>`,
		})
	}

	public async getOrderInfo(orderId: number) {
		const order = await this.ordersRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.orderUser', 'orderUser')
			.leftJoinAndSelect('it.orderProducts', 'orderProducts')
			.leftJoinAndSelect('orderProducts.product', 'product')
			.leftJoinAndSelect('product.translations', 'productTranslations')
			.where('it.id = :id', { id: orderId })
			.getOne()

		order.shipping = await this.shippingService.getOne(order.shippingId)

		return order
	}
}
