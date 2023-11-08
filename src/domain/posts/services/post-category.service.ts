import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	IPostCategoryCreatePayload,
	IPostCategoryRepository,
	IPostCategoryService,
	IPostCategoryTranslateRepository,
	POSTS_CATEGORIES_REPOSITORY,
	POSTS_CATEGORIES_TRANSLATE_REPOSITORY,
} from '../typing'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

@Injectable()
export class PostCategoryService implements IPostCategoryService {
	@Inject(POSTS_CATEGORIES_REPOSITORY)
	private readonly postCategoryRepository: IPostCategoryRepository
	@Inject(POSTS_CATEGORIES_TRANSLATE_REPOSITORY)
	private readonly postTranslateCategoryRepository: IPostCategoryTranslateRepository

	public async create(payload: IPostCategoryCreatePayload): Promise<void> {
		const category = await this.postCategoryRepository.save(payload)

		await this.putTranslations(category.id, payload.translations, false)
	}

	public async delete(id: number): Promise<void> {
		await this.postCategoryRepository.delete({ id })
	}

	public async update(id: number, payload: Partial<IPostCategoryCreatePayload>): Promise<void> {
		const type = await this.postCategoryRepository.findOne({ where: { id } })

		if (!type) throw new NotFoundException('Category not found')

		const dataEntity = omitBy(omit(payload, ['translations']), isNil)

		if (!isEmpty(payload.translations)) {
			await this.putTranslations(type.id, payload.translations)
		}

		if (!isEmpty(dataEntity)) {
			await this.postCategoryRepository.update(id, dataEntity)
		}
	}

	private async putTranslations(
		categoryId: number,
		translates: IPostCategoryCreatePayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.postTranslateCategoryRepository.delete({ categoryId })
		const toSave = translates.map(it => ({
			lang: it.lang,
			name: it.name,
			categoryId,
			description: it.description,
		}))

		await this.postTranslateCategoryRepository.insert(toSave)
		return toSave
	}
}
