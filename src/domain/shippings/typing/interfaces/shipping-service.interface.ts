import { ShippingType } from '../enums'
import { IShipping } from './shipping.interfaces'

export interface IShippingService {
	create(payload: IShippingCreatePayload): Promise<IShipping>
	getOne(id: number): Promise<IShipping>
}

export interface IShippingCreatePayload {
	countryCode?: string
	addressLine?: string

	type: ShippingType

	novaPoshtaData?: {
		region: string
		regionId?: string

		town: string
		townId?: string

		departmentName: string
		departmentCode: string
	}

	ukrPoshtaData?: {
		town: string
		departmentAddress: string
	}
}
