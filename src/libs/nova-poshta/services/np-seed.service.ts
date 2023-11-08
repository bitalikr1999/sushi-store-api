import { Inject, Injectable } from '@nestjs/common'
import {
	INPCityRepository,
	INPDepartmentRepository,
	INovaPoshtaApi,
	INovaPoshtaModuleOptions,
	NOVA_POSHTA_API,
	NOVA_POSHTA_CITY_REPOSITORY,
	NOVA_POSHTA_DEPARTMENT_REPOSITORY,
	NOVA_POSHTA_OPTIONS,
	NovaPoshtaCity,
} from '../typing'

@Injectable()
export class NPSeedService {
	@Inject(NOVA_POSHTA_API)
	private readonly novaPoshtaAPI: INovaPoshtaApi

	@Inject(NOVA_POSHTA_CITY_REPOSITORY)
	private readonly cityRepository: INPCityRepository

	@Inject(NOVA_POSHTA_DEPARTMENT_REPOSITORY)
	private readonly departmentRepository: INPDepartmentRepository

	@Inject(NOVA_POSHTA_OPTIONS)
	private readonly options: INovaPoshtaModuleOptions

	private page = 0

	onModuleInit() {
		if (this.options.seedEnabled) this.run()
	}

	async run() {
		let next = true

		while (next) {
			next = await this.loadCity()
			this.page++
			console.log('Page', this.page)
		}
	}

	private async loadCity() {
		const data = await this.novaPoshtaAPI.findCities({
			page: String(this.page),
			limit: '50',
		})
		if (!data.length) return false
		for await (const city of data) {
			try {
				await this.saveCity(city)
			} catch (e) {}
		}

		return true
	}

	private async saveCity(city: NovaPoshtaCity) {
		if (!city) return null

		const checkExist = await this.cityRepository.findOneBy({
			id: city.ref,
		})
		if (!checkExist) {
			await this.cityRepository.insert({
				id: city.ref,
				name: city.name,
				areaRef: city.areaRef,
				area: city.area,
			})
		}

		const departments = await this.novaPoshtaAPI.findWarehouse({
			cityRef: city.ref,
		})

		const toInsert = []

		await Promise.all(
			departments.map(async item => {
				const exist = await this.departmentRepository.findOneBy({
					id: item.ref,
				})
				if (!exist)
					toInsert.push({
						id: item.ref,
						name: item.address,
						number: item.number,
						cityId: item.cityRef,
					})
			}),
		)

		await this.departmentRepository.insert(toInsert)
	}
}
