import { Inject, Injectable } from '@nestjs/common'
import { PRODUCTS_REPOSITORY, PRODUCTS_SERVICE } from 'src/domain/products/typing/consts'
import {
	CreateProductPayload,
	IProductsRepository,
	IProductsService,
} from 'src/domain/products/typing/interfaces'
import { UpdateProductPayloadDto } from './dto/product-editor.dto'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { Brackets } from 'typeorm'
import { transformFileUrl } from 'src/shared/transforms'

@Injectable()
export class RestProductsService {
	@Inject(PRODUCTS_SERVICE)
	private readonly productsService: IProductsService

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	public async create(userId: number, dto: CreateProductPayload) {
		return await this.productsService.create({
			...dto,
		})
	}

	public async update(id: number, payload: UpdateProductPayloadDto) {
		await this.productsService.update(id, payload)
	}

	public async delete(id: number) {
		await this.productsService.delete(id)
	}

	public async getList(pagination: IPagination) {
		const query = this.productsRepository
			.createQueryBuilder('it')
			.where('it.id IS NOT NULL')
			.leftJoinAndSelect('it.translations', 'translations')
			.leftJoinAndSelect('it.variants', 'variants')

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.name ILIKE :searchString', {
						searchString: prepareSearchString(pagination.searchString),
					})
				}),
			)
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return { items, count }
	}

	public async getOne(id: number) {
		const product = await this.productsRepository.findOne({
			where: { id },
			relations: ['translations', 'previewMedia', 'variants'],
		})

		if (product.previewMedia)
			product.previewMedia.url = transformFileUrl(product.previewMedia.url)

		return product
	}
}
