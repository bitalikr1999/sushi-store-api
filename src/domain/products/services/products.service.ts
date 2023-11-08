import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	CreateProductPayload,
	IProductsRepository,
	IProductsService,
	IProductsTranslationsRepository,
} from '../typing/interfaces'
import { PRODUCTS_REPOSITORY, PRODUCTS_TRANSLATIONS_REPOSITORY } from '../typing/consts'
import * as _ from 'lodash'
import * as cyrToLat from 'cyrillic-to-latin'
import { camelize } from 'src/shared'
import { ProductsVariantsService } from './products-variants.service'

@Injectable()
export class ProductsService implements IProductsService {
	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(PRODUCTS_TRANSLATIONS_REPOSITORY)
	private readonly productsTranslationsRepository: IProductsTranslationsRepository

	constructor(private readonly productsVariantsService: ProductsVariantsService) {}

	public async create(payload: CreateProductPayload) {
		const product = await this.productsRepository.save({
			...payload,
			key: camelize(cyrToLat(payload.translations[0].name)),
		})

		await this.putTranslations(product.id, payload.translations, false)

		if (payload.variants && !_.isEmpty(payload.variants)) {
			await this.productsVariantsService.put(product.id, payload.variants)
		}
		return product
	}

	public async update(id: number, payload: Partial<CreateProductPayload>) {
		const product = await this.productsRepository.findOne({ where: { id } })
		if (!product) throw new NotFoundException('Product not found')

		const dataEntity = _.omitBy(_.omit(payload, ['translations', 'variants']), _.isNil)

		if (!_.isEmpty(dataEntity)) {
			await this.productsRepository.update(id, dataEntity)
		}

		if (!_.isEmpty(payload.translations)) {
			await this.putTranslations(product.id, payload.translations)
		}

		if (payload.variants && !_.isEmpty(payload.variants)) {
			await this.productsVariantsService.put(product.id, payload.variants)
		}
		return product
	}

	public async delete(id: number): Promise<void> {
		await this.productsRepository.delete({ id })
	}

	public async putTranslations(
		productId: number,
		translates: CreateProductPayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.productsTranslationsRepository.delete({ productId })
		const toSave = translates.map(it => ({
			name: it.name,
			productId,
			lang: it.lang,
			description: it.description,
		}))
		await this.productsTranslationsRepository.insert(toSave)
		return toSave
	}
}
