import { Inject, Injectable } from '@nestjs/common'
import {
	IPostCategoryRepository,
	IPostCategoryService,
	POSTS_CATEGORIES_REPOSITORY,
	POSTS_CATEGORIES_SERVICE,
} from 'src/domain/posts/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'
import { AdminPostCategoryDto, CreatePostCategoryDto, UpdatePostCategoryDto } from './dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class RestAdminPostCategoriesService {
	@Inject(POSTS_CATEGORIES_SERVICE) private readonly postCategoriesService: IPostCategoryService
	@Inject(POSTS_CATEGORIES_REPOSITORY)
	private readonly postCategoriesRepository: IPostCategoryRepository

	public async create(userId: number, dto: CreatePostCategoryDto) {
		await this.postCategoriesService.create({
			...dto,
			authorId: userId,
		})
	}

	public async update(userId: number, id: number, dto: UpdatePostCategoryDto) {
		await this.postCategoriesService.update(id, { ...dto, authorId: userId })
	}

	public async delete(id: number) {
		await this.postCategoriesService.delete(id)
	}

	public async getList(pagination: IPagination) {
		const items: AdminPostCategoryDto[] = await this.getChildrens(null)
		return { items }
	}
	public async getChildrens(parentId: number | null) {
		const query = this.postCategoriesRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')

		if (parentId) query.where('it.parentId = :parentId', { parentId })
		else query.where('it.parentId IS NULL')

		const items: AdminPostCategoryDto[] = await query.getMany()
		
		for await (const [index, item] of items.entries()) {
			items[index].childrens = await this.getChildrens(item.id)
		}
		return items.map(it =>
			plainToInstance(AdminPostCategoryDto, it, { excludeExtraneousValues: true }),
		)
	}
}
