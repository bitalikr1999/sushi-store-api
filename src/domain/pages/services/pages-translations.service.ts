import { Inject, Injectable } from '@nestjs/common'
import { PAGES_TRANSLATIONS_REPOSITORY } from '../typing/consts'
import { CreatePagePayload, IPageTranslationsRepository } from '../typing'

@Injectable()
export class PagesTranslationsService {
	@Inject(PAGES_TRANSLATIONS_REPOSITORY)
	private readonly translationsRepository: IPageTranslationsRepository

	public async put(
		pageId: number,
		translates: CreatePagePayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.translationsRepository.delete({ pageId })
		const toSave = translates.map(it => ({
			title: it.title,
			pageId,
			lang: it.lang,
			description: it.description,
		}))
		await this.translationsRepository.insert(toSave)
		return toSave
	}
}
