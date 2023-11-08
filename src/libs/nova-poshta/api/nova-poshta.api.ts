import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { INovaPoshtaModuleOptions, NOVA_POSHTA_OPTIONS } from '../typing'
import {
	IFindNovaPoshtaCitiesOptions,
	IFindWarehouseOptions,
	INovaPoshtaApi,
	NovaPoshtaWarehouse,
} from '../typing/nova-poshta-api.interface'

@Injectable()
export class NovaPoshtaApi implements INovaPoshtaApi {
	private http: AxiosInstance

	@Inject(NOVA_POSHTA_OPTIONS)
	private readonly options: INovaPoshtaModuleOptions

	constructor() {
		this.http = axios.create({
			baseURL: 'https://api.novaposhta.ua/v2.0/json/',
		})
	}

	public async findCities(params: IFindNovaPoshtaCitiesOptions) {
		const { data } = await this.http.post('', {
			apiKey: this.options.apiKey,
			modelName: 'Address',
			calledMethod: 'getSettlements',
			methodProperties: {
				Page: params.page,

				Limit: params.limit,
			},
		})

		return data.data.map(item => {
			return {
				name: item.Description,
				region: item.Region,
				area: item.AreaDescription,
				areaRef: item.Area,
				ref: item.Ref,
			}
		})
	}

	public async findWarehouse(params: IFindWarehouseOptions): Promise<NovaPoshtaWarehouse[]> {
		const { data } = await this.http.post('', {
			apiKey: this.options.apiKey,
			modelName: 'Address',
			calledMethod: 'getWarehouses',
			methodProperties: {
				SettlementRef: params.cityRef,
				FindByString: params.searchString,
				Page: '1',
				Limit: '300',
				Language: 'UA',
			},
		})

		return data.data.map(it => {
			return {
				address: it.Description,
				number: it.Number,
				ref: it.Ref,
				cityRef: it.SettlementRef,
			}
		})
	}

	public async getWarehouseData(ref: string) {
		const { data } = await this.http.post('', {
			apiKey: this.options.apiKey,
			modelName: 'Address',
			calledMethod: 'getWarehouses',
			methodProperties: {
				Ref: ref,
				Page: '1',
				Limit: '1',
				Language: 'UA',
			},
		})

		return data.data[0]
	}
}
