import { Inject, Injectable } from '@nestjs/common'
import {
	IPostTypeRepository,
	IPostTypeService,
	POSTS_TYPE_SERVICE,
	POST_TYPE_REPOSITORY,
} from 'src/domain/posts/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'
import { CreatePostTypeDto, UpdatePostTypeDto } from './dto'

@Injectable()
export class RestAdminPostTypeService {
	@Inject(POST_TYPE_REPOSITORY) private readonly postTypeRepository: IPostTypeRepository
	@Inject(POSTS_TYPE_SERVICE) private readonly postTypeService: IPostTypeService

	public async create(userId: number, dto: CreatePostTypeDto) {
		await this.postTypeService.create({
			...dto,
			authorId: userId,
		})
	}

	public async update(userId: number, id: number, dto: UpdatePostTypeDto) {
		await this.postTypeService.update(id, { ...dto, authorId: userId })
	}

	public async delete(id: number) {
		await this.postTypeService.delete(id)
	}

	public async getList(pagination: IPagination) {
		const query = this.postTypeRepository
			.createQueryBuilder('it')
			.where('it.id IS NOT NULL')
			.leftJoinAndSelect('it.translations', 'translations')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return { items, count }
	}
}
