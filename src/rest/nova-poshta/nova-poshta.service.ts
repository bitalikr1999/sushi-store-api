import { Inject, Injectable } from '@nestjs/common'
import {
	INPCityRepository,
	INPDepartmentRepository,
	INovaPoshtaApi,
	NOVA_POSHTA_API,
	NOVA_POSHTA_CITY_REPOSITORY,
	NOVA_POSHTA_DEPARTMENT_REPOSITORY,
} from 'src/libs'
import { FindCitiesParamsDto, FindWarehousesParamsDto } from './dto'
import { prepareSearchString } from 'src/shared'

@Injectable()
export class RestNovaPoshtaService {
	@Inject(NOVA_POSHTA_API)
	private readonly novaPoshtaApi: INovaPoshtaApi

	@Inject(NOVA_POSHTA_CITY_REPOSITORY)
	private readonly npCityRepository: INPCityRepository

	@Inject(NOVA_POSHTA_DEPARTMENT_REPOSITORY)
	private readonly npDepartmentRepository: INPDepartmentRepository

	public async findCities(params: FindCitiesParamsDto) {
		const query = this.npCityRepository
			.createQueryBuilder('it')
			.where('it.name ILIKE :ss', { ss: prepareSearchString(params.searchString) })
			.limit(50)

		return await query.getMany()
	}

	public async findWarehouses(params: FindWarehousesParamsDto) {
		const items = await this.npDepartmentRepository
			.createQueryBuilder('it')
			.where('it.name ILIKE :ss', { ss: prepareSearchString(params.searchString) })
			.andWhere('it.cityId = :cityId', { cityId: params.cityRef })
			.limit(100)
			.getMany()

		return items
	}
}
