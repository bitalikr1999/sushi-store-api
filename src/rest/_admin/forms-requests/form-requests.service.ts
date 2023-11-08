import { Inject, Injectable } from '@nestjs/common'
import {
	FORM_REQUESTS_REPOSITORY,
	FORM_REQUESTS_SERVICE,
	FormRequestStatus,
	IFormRequestsRepository,
	IFormRequestsService,
} from 'src/domain/forms/typing'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { GetFormRequestsParamsDto, UpdateStatusFormRequestPayloadDto } from './dto'
import { Brackets } from 'typeorm'

@Injectable()
export class RestAdminFormRequestsService {
	@Inject(FORM_REQUESTS_SERVICE)
	private readonly formRequestsService: IFormRequestsService

	@Inject(FORM_REQUESTS_REPOSITORY)
	private readonly formRequestRepository: IFormRequestsRepository

	public async get(userId: number, pagination: IPagination, params: GetFormRequestsParamsDto) {
		const query = this.formRequestRepository.createQueryBuilder('it').where('it.id IS NOT NULL')

		if (params.status) {
			query.andWhere('it.status = :status', { status: params.status })
		}

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.title ILIKE :ss', {
						ss: prepareSearchString(pagination.searchString),
					})
					qb.orWhere('it.userName ILIKE :ss')
					qb.orWhere('it.userEmail ILIKE :ss')
					qb.orWhere('it.userPhoneNumber ILIKE :ss')
					qb.orWhere('it.form ILIKE :ss')
				}),
			)
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return { items, count }
	}

	public async updateStatus(userId: number, id: number, dto: UpdateStatusFormRequestPayloadDto) {
		await this.formRequestsService.updateStatus(id, dto.status)
	}

	public async getDetails(id: number) {
		return await this.formRequestRepository.findOne({ where: { id } })
	}

	public async getNewCount() {
		const count = await this.formRequestRepository.count({
			where: { status: FormRequestStatus.New },
		})
		return count
	}
}
