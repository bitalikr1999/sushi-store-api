import { Inject, Injectable } from '@nestjs/common'
import {
	PRODUCT_CATEGORIES_REPOSITORY,
	PRODUCT_CATEGORIES_SERVICE,
} from 'src/domain/products/typing/consts'
import {
	IProductCategoriesService,
	IProductsCategoriesRepository,
} from 'src/domain/products/typing/interfaces'
import { CreateProductCategoryPayloadDto, UpdateProductCategoryPayloadDto } from './dto'
import { plainToInstance } from 'class-transformer'
import { AdminProductCategoryDto } from './dto/get-product-categories.dto'

@Injectable()
export class RestProductsCategoriesService {
	@Inject(PRODUCT_CATEGORIES_SERVICE)
	private readonly productsCategoriesService: IProductCategoriesService

	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productCategoriesRepository: IProductsCategoriesRepository

	public async create(userId: number, dto: CreateProductCategoryPayloadDto) {
		await this.productsCategoriesService.create({
			...dto,
			authorId: userId,
		})
	}

	public async update(id: number, payload: UpdateProductCategoryPayloadDto) {
		await this.productsCategoriesService.update(id, payload)
	}

	public async getFullList() {
		const items: AdminProductCategoryDto[] = await this.getChildrens(null)
		return { items }
	}

	public async getChildrens(parentId: number | null) {
		const query = this.productCategoriesRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')

		if (parentId) query.where('it.parentId = :parentId', { parentId })
		else query.where('it.parentId IS NULL')

		const items: AdminProductCategoryDto[] = await query.getMany()

		for await (const [index, item] of items.entries()) {
			items[index].childrens = await this.getChildrens(item.id)
		}

		return items.map(it =>
			plainToInstance(AdminProductCategoryDto, it, { excludeExtraneousValues: true }),
		)
	}

	public async delete(id: number) {
		await this.productsCategoriesService.delete(id)
	}
}
