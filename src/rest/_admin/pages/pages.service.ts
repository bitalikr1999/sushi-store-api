import { Inject, Injectable } from '@nestjs/common'
import { IPageService, IPagesRepository } from 'src/domain/pages/typing'
import { PAGES_REPOSITORY, PAGES_SERVICE } from 'src/domain/pages/typing/consts'
import { CreatePagePayloadDto, UpdatePagePayloadDto } from './dto'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { Brackets } from 'typeorm'

@Injectable()
export class RestAdminPagesService {
	@Inject(PAGES_SERVICE)
	private readonly pagesService: IPageService

	@Inject(PAGES_REPOSITORY)
	private readonly pagesRepository: IPagesRepository

	public async create(userId: number, dto: CreatePagePayloadDto) {
		return await this.pagesService.create({
			...dto,
			authorId: userId,
		})
	}

	public async update(id: number, userId: number, dto: UpdatePagePayloadDto) {
		return await this.pagesService.update(id, dto)
	}

	public async remove(id: number) {
		await this.pagesService.remove(id)
	}

	public async getList(pagination: IPagination) {
		const query = this.pagesRepository
			.createQueryBuilder('it')
			.where('it.id IS NOT NULL')
			.leftJoinAndSelect('it.translations', 'translations')

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.title ILIKE :searchString', {
						searchString: prepareSearchString(pagination.searchString),
					})
					qb.orWhere('it.key ILIKE :searchString')
					qb.orWhere('it.template ILIKE :searchString')
				}),
			)
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return { items, count }
	}

	public async getOne(id: number) {
		const page = await this.pagesRepository.findOne({
			where: { id },
			relations: ['translations'],
		})
		return page
	}
}
