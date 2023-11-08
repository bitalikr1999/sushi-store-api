import { ShippingType } from '../enums'

export interface IShipping {
	id: number

	countryCode?: string
	addressLine?: string

	type: ShippingType

	novaPoshtaData?: IShippingNovaPoshta
	urkPoshtaData?: IShippingUrkPoshta
}

export interface IShippingNovaPoshta {
	shippingId: number

	region: string
	regionId?: string

	town: string
	townId?: string

	departmentName: string
	departmentCode: string
}

export interface IShippingUrkPoshta {
	shippingId: number

	town: string
	departmentAddress: string
}
