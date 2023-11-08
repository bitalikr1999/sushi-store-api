import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
	IShipping,
	IShippingCreatePayload,
	IShippingNovaPoshtaRepository,
	IShippingRepository,
	IShippingService,
	IShippingUkrPoshtaRepository,
	ShippingType,
} from '../typing'
import {
	SHIPPING_NOVA_POSHTA_REPOSITORY,
	SHIPPING_REPOSITORY,
	SHIPPING_URK_POSHTA_REPOSITORY,
} from '../typing/consts'

@Injectable()
export class ShippingService implements IShippingService {
	@Inject(SHIPPING_REPOSITORY)
	private readonly shippingRepository: IShippingRepository

	@Inject(SHIPPING_NOVA_POSHTA_REPOSITORY)
	private readonly shippingNovaPoshtaRepository: IShippingNovaPoshtaRepository

	@Inject(SHIPPING_URK_POSHTA_REPOSITORY)
	private readonly shippingUkrPoshtaRepository: IShippingUkrPoshtaRepository

	public async create(payload: IShippingCreatePayload): Promise<IShipping> {
		if (payload.type === ShippingType.NovaPoshta && !payload.novaPoshtaData)
			throw new BadRequestException('Nova poshta data required')

		const shipping = await this.shippingRepository.save({
			countryCode: payload.countryCode,
			addressLine: payload.addressLine,
			type: payload.type,
		})

		if (shipping.type === ShippingType.NovaPoshta)
			await this.createNovaPoshtaRecord(shipping.id, payload.novaPoshtaData)

		if (shipping.type === ShippingType.UkrPoshta)
			await this.createUkrPoshtaRecord(shipping.id, payload.ukrPoshtaData)

		return shipping
	}

	private async createNovaPoshtaRecord(
		shippingId: number,
		payload: IShippingCreatePayload['novaPoshtaData'],
	) {
		await this.shippingNovaPoshtaRepository.insert({
			shippingId,
			region: payload.region,
			regionId: payload.regionId,

			town: payload.town,
			townId: payload.townId,

			departmentName: payload.departmentName,
			departmentCode: payload.departmentCode,
		})
	}

	private async createUkrPoshtaRecord(
		shippingId: number,
		payload: IShippingCreatePayload['ukrPoshtaData'],
	) {
		await this.shippingUkrPoshtaRepository.insert({
			shippingId,
			town: payload.town,
			departmentAddress: payload.departmentAddress,
		})
	}

	public async getOne(id: number): Promise<IShipping> {
		const shipping = await this.shippingRepository.findOne({ where: { id } })

		if (shipping.type === ShippingType.NovaPoshta) {
			shipping.novaPoshtaData = await this.shippingNovaPoshtaRepository.findOne({
				where: { shippingId: id },
			})
		}

		if (shipping.type === ShippingType.UkrPoshta) {
			shipping.urkPoshtaData = await this.shippingUkrPoshtaRepository.findOne({
				where: { shippingId: id },
			})
		}

		return shipping
	}
}
