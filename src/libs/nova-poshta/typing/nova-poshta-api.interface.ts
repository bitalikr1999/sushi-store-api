export interface INovaPoshtaApi {
	findCities(params: IFindNovaPoshtaCitiesOptions): Promise<NovaPoshtaCity[]>
	findWarehouse(params: IFindWarehouseOptions): Promise<NovaPoshtaWarehouse[]>
	getWarehouseData(ref: string): Promise<any>
}

export interface IFindNovaPoshtaCitiesOptions {
	searchString?: string
	page?: string
	limit?: string
}

export interface IFindWarehouseOptions {
	searchString?: string
	cityRef?: string
}

export interface NovaPoshtaCity {
	name: string
	region: string
	area: string
	areaRef: string
	ref: string
}

export interface NovaPoshtaWarehouse {
	address: string
	number: string
	ref: string
	cityRef: string
}
