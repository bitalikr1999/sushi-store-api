import { Inject, Injectable } from '@nestjs/common'
import {
	CONTENT_FIELDS_REPOSITORY,
	IContentField,
	IContentFieldRepository,
	IContentService,
	ILoadOneParams,
	PutContentPayload,
} from '../typing'
import { ContentFieldType } from '../typing/enums'
import { prepareContentItem } from '../helpers'
import {
	IProductsCategoriesRepository,
	PRODUCT_CATEGORIES_REPOSITORY,
} from 'src/domain/products/typing'
import { Lang, getTranslate } from 'src/shared'

@Injectable()
export class ContentService implements IContentService {
	@Inject(CONTENT_FIELDS_REPOSITORY)
	private readonly contentFieldsRepository: IContentFieldRepository

	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productCategoriesRepository: IProductsCategoriesRepository

	public async put(payload: PutContentPayload): Promise<void> {
		const exist = await this.contentFieldsRepository.findOne({
			where: {
				key: payload.key,
				parentId: payload.parentId,
				parentTable: payload.parentTable,
			},
		})
		if (exist) await this.contentFieldsRepository.delete(exist.id)

		await this.contentFieldsRepository.insert({
			key: payload.key,
			parentId: payload.parentId,
			parentTable: payload.parentTable,
			content: payload.content,
			authorId: payload.authorId,
		})
	}

	public async loadOne(params: ILoadOneParams): Promise<Record<string, any>> {
		const content = await this.contentFieldsRepository.find({
			where: {
				parentId: params.parentId,
				parentTable: params.parentTable,
			},
		})

		const result: Record<string, any> = {}

		await Promise.all(
			content.map(async it => {
				try {
					const type = it.content?.type
					result[it.key] = await this.prepareContentItem(type, it, params.lang)
				} catch (e) {
					console.log(it, e)
				}
			}),
		)

		return result
	}

	public async prepareContentItem(type: ContentFieldType, it: IContentField, lang: Lang) {
		if (type === ContentFieldType.Reapeter) {
			return await this.prepareRepeater(it, lang)
		} else {
			return await this.prepareFieldContent(it.content.type, it.content.value, lang)
		}
	}

	private async prepareRepeater(it: IContentField, lang: Lang) {
		if (!it.content.value) return null

		const result = []

		for await (const fields of it.content.value) {
			const toPush: Record<string, any> = {}
			await Promise.all(
				fields.map(async it => {
					toPush[it.key] = await this.prepareFieldContent(it.type, it.value, lang)
				}),
			)

			result.push(toPush)
		}
		return result
	}

	private async prepareFieldContent(type: ContentFieldType, value: any, lang: Lang) {
		if (type === ContentFieldType.ProductCategory) {
			const productCategory = await this.productCategoriesRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.where('it.id = :id', { id: Number(value) })
				.getOne()

			return {
				...productCategory,
				translate: getTranslate(productCategory.translations, lang),
			}
		}

		if ([ContentFieldType.Text, ContentFieldType.Textarea].includes(type)) {
			if (!value) return ''
			if (typeof value === 'string') return value
			else if (value[lang]) return value[lang]
			else {
				const keys = Object.keys(value)
				return value[keys[0]]
			}
		}
		if (type === ContentFieldType.Image) return value
	}
}
