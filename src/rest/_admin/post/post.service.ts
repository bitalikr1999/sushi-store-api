import { Inject, Injectable } from '@nestjs/common'
import {
	IPostRepository,
	IPostService,
	POSTS_REPOSITORY,
	POSTS_SERVICE,
} from 'src/domain/posts/typing'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { Brackets } from 'typeorm'
import { ICreatePostDto, IGetPostListDto, IUpdatePostDto } from './dto'

@Injectable()
export class RestAdminPostService {
	@Inject(POSTS_SERVICE) private readonly postService: IPostService
	@Inject(POSTS_REPOSITORY) private readonly postRepository: IPostRepository

	public async create(dto: ICreatePostDto, userId) {
		await this.postService.create({ ...dto, authorId: userId })
	}

	public async update(id: number, dto: IUpdatePostDto) {
		await this.postService.update(id, dto)
	}

	public async delete(id: number) {
		await this.postService.delete(id)
	}

	public async getOne(id: number) {
		const product = await this.postRepository.findOne({ where: { id } })

		return product
	}

	public async getList(dto: IGetPostListDto, pagination: IPagination) {
		const query = this.postRepository
			.createQueryBuilder('it')
			.where('it.id IS NOT NULL')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.postToCategories', 'postToCategories')
			.leftJoinAndSelect('postToCategories.category', 'category')
			.leftJoinAndSelect('category.translations', 'ct')
			.leftJoinAndSelect('it.type', 'type')
			.leftJoinAndSelect('type.translations', 'tt')

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('translations.title ILIKE :searchString', {
						searchString: prepareSearchString(pagination.searchString),
					})
				}),
			)
		}

		if (dto.typeId) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.typeId = :typeId', {
						typeId: Number(dto.typeId),
					})
				}),
			)
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return {
			items: items.map(it => ({
				...it,
				postToCategories: it.postToCategories.map(el => el.category),
			})),
			count,
		}
	}
}
