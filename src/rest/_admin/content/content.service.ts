import { Inject, Injectable } from '@nestjs/common'
import {
	CONTENT_FIELDS_REPOSITORY,
	CONTENT_SERVICE,
	IContentFieldRepository,
	IContentService,
} from 'src/domain/content/typing'
import { GetContentParamsDto, GetTemplateParamsDto, PutContentPayloadDto } from './dtos'
import { templatesConfig } from 'src/config/templates'
import {
	IProductsCategoriesRepository,
	PRODUCT_CATEGORIES_REPOSITORY,
} from 'src/domain/products/typing'
import { ClearContentPayload } from './dtos/clear-content.dto'
import { baseProductTemplate } from 'src/config/templates/products.templates'
import { defaultTo } from 'lodash'

@Injectable()
export class AdminContentService {
	@Inject(CONTENT_SERVICE) private contentService: IContentService

	@Inject(CONTENT_FIELDS_REPOSITORY)
	private readonly contentFieldsRepository: IContentFieldRepository

	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productsCategoriesRepository: IProductsCategoriesRepository

	public async put(userId: number, dto: PutContentPayloadDto) {
		await this.contentService.put({
			...dto,
			authorId: userId,
		})
	}

	public async clear(dto: ClearContentPayload) {
		await this.contentFieldsRepository.delete({
			parentId: dto.parentId,
			parentTable: dto.parentTable,
		})
	}

	public async getTemplatesList() {
		return templatesConfig.values
	}

	public async getTemplate(dto: GetTemplateParamsDto) {
		const key = await this.findTemplateName(dto.template)
		const template = defaultTo(templatesConfig.templates[key], [])

		if (dto.template.includes('productCategory')) {
			template.push(...baseProductTemplate)
		}

		return template
	}

	public async getContent(dto: GetContentParamsDto) {
		return await this.contentFieldsRepository.find({
			where: {
				parentId: dto.parentId,
				parentTable: dto.parentTable,
			},
		})
	}

	private async findTemplateName(template: string) {
		if (!template.includes(':')) return template

		const table = template.split(':')[0]
		const id = Number(template.split(':')[1])

		if (table === 'productCategory') {
			const category = await this.productsCategoriesRepository.findOne({ where: { id } })
			return category.key
		}
	}
}
