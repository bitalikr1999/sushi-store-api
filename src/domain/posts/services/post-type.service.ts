import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	IPostTypeCreatePayload,
	IPostTypeRepository,
	IPostTypeService,
	IPostTypeTranslateRepository,
	POSTS_TYPE_TRANSLATE_REPOSITORY,
	POST_TYPE_REPOSITORY,
} from '../typing'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

@Injectable()
export class PostTypeService implements IPostTypeService {
	@Inject(POST_TYPE_REPOSITORY) private readonly postTypeRepository: IPostTypeRepository
	@Inject(POSTS_TYPE_TRANSLATE_REPOSITORY)
	private readonly postTypeTranslateRepository: IPostTypeTranslateRepository

	public async create(payload: IPostTypeCreatePayload): Promise<void> {
		const type = await this.postTypeRepository.save(payload)

		await this.putTranslations(type.id, payload.translations, false)
	}

	public async update(id: number, payload: Partial<IPostTypeCreatePayload>): Promise<void> {
		const type = await this.postTypeRepository.findOne({ where: { id } })

		if (!type) throw new NotFoundException('Type not found')

		const dataEntity = omitBy(omit(payload, ['translations']), isNil)

		if (!isEmpty(payload.translations)) {
			await this.putTranslations(type.id, payload.translations)
		}

		if (!isEmpty(dataEntity)) {
			await this.postTypeRepository.update(id, dataEntity)
		}
	}

	public async delete(id: number): Promise<void> {
		await this.postTypeRepository.delete({ id })
	}

	private async putTranslations(
		typeId: number,
		translates: IPostTypeCreatePayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.postTypeTranslateRepository.delete({ typeId })
		const toSave = translates.map(it => ({
			lang: it.lang,
			name: it.name,
			typeId,
			description: it.description,
		}))

		await this.postTypeTranslateRepository.insert(toSave)
		return toSave
	}
}
