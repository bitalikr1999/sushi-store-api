import { Repository } from 'typeorm'
import { INPCity, INPDepartment } from './entities.interface'

export interface INovaPoshtaModuleOptions {
	apiKey: string
	seedEnabled: boolean
}

export const NOVA_POSHTA_OPTIONS = Symbol('NOVA_POSHTA_OPTIONS')
export const NOVA_POSHTA_API = Symbol('NOVA_POSHTA_API')
export const NOVA_POSHTA_CITY_REPOSITORY = Symbol('NOVA_POSHTA_CITY_REPOSITORY')
export const NOVA_POSHTA_DEPARTMENT_REPOSITORY = Symbol('NOVA_POSHTA_DEPARTMENT_REPOSITORY')

export type INPCityRepository = Repository<INPCity>
export type INPDepartmentRepository = Repository<INPDepartment>
