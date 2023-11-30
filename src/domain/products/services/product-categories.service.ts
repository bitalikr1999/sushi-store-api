import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'

import {
	PRODUCT_CATEGORIES_REPOSITORY,
	PRODUCT_CATEGORIES_TRANSLATIONS_REPOSITORY,
} from '../typing/consts'
import {
	CreateProductCategoryPayload,
	IProductCategoriesService,
	IProductCategory,
	IProductsCategoriesRepository,
	IProductsCategoriesTranslationsRepository,
} from '../typing/interfaces'
import * as _ from 'lodash'

@Injectable()
export class ProductCategoriesService implements IProductCategoriesService {
	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productCategoriesRepository: IProductsCategoriesRepository

	@Inject(PRODUCT_CATEGORIES_TRANSLATIONS_REPOSITORY)
	private readonly translationsRepository: IProductsCategoriesTranslationsRepository

	public async create(payload: CreateProductCategoryPayload) {
		const existKey = await this.productCategoriesRepository.findOne({
			where: { key: payload.key },
		})
		if (existKey) throw new ConflictException('Page key already exist')

		const category = await this.productCategoriesRepository.save(payload)

		await this.putTranslations(category.id, payload.translations, false)
		const path = await this.generatePath(category)
		await this.productCategoriesRepository.update(category.id, { path })
	}

	public async update(id: number, payload: Partial<CreateProductCategoryPayload>) {
		const category = await this.productCategoriesRepository.findOne({ where: { id } })
		if (!category) throw new NotFoundException('Category not found')

		const dataEntity = _.omitBy(_.omit(payload, ['translations']), _.isNil)

		if (!_.isEmpty(dataEntity)) {
			await this.productCategoriesRepository.update(id, dataEntity)
		}

		if (!_.isEmpty(payload.translations)) {
			await this.putTranslations(category.id, payload.translations)
		}

		if (payload.parentId) {
			const path = await this.generatePath(category)
			await this.productCategoriesRepository.update(category.id, { path })
		}
	}

	public async delete(id: number) {
		await this.productCategoriesRepository.delete({ id })
	}

	public async putTranslations(
		categoryId: number,
		translates: CreateProductCategoryPayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.translationsRepository.delete({ categoryId })
		const toSave = translates.map(it => ({
			name: it.name,
			categoryId,
			lang: it.lang,
			description: it.description,
		}))
		await this.translationsRepository.insert(toSave)
		return toSave
	}

	public async getHighRoot(categoryId: number): Promise<IProductCategory> {
		const childCategory = await this.productCategoriesRepository.findOneBy({ id: categoryId })
		if (!childCategory) throw new Error('Not found category')

		const rootId = _.defaultTo(childCategory.path[0], categoryId)

		const root = await this.productCategoriesRepository.findOne({
			where: { id: rootId },
			relations: ['translations'],
		})
		return root
	}

	private async generatePath(category: IProductCategory) {
		if (!category.parentId) return []

		const parent = await this.productCategoriesRepository.findOne({
			where: { id: category.parentId },
		})

		return [...parent.path, parent.id]
	}
}
