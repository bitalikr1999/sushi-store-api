import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PAGES_REPOSITORY } from '../typing/consts'
import { IPagesRepository } from '../typing/interfaces/page-repository.interface'
import { CreatePagePayload, IPageService, UpdatePagePayload } from '../typing'
import { PagesTranslationsService } from './pages-translations.service'
import * as _ from 'lodash'

@Injectable()
export class PagesService implements IPageService {
	@Inject(PAGES_REPOSITORY)
	private pagesRepository: IPagesRepository

	constructor(private pagesTranslationsService: PagesTranslationsService) {}

	public async create(payload: CreatePagePayload) {
		const existKey = await this.pagesRepository.findOne({ where: { key: payload.key } })
		if (existKey) throw new ConflictException('Page key already exist')

		const page = await this.pagesRepository.save(payload)

		await this.pagesTranslationsService.put(page.id, payload.translations, false)

		return page
	}

	public async update(id: number, payload: UpdatePagePayload) {
		const page = await this.pagesRepository.findOne({ where: { id } })
		if (!page) throw new NotFoundException('Page not found')

		const dataEntity = _.omitBy(_.omit(payload, ['translations']), _.isNil)

		if (!_.isEmpty(dataEntity)) {
			await this.pagesRepository.update(id, dataEntity)
		}

		if (!_.isEmpty(payload.translations)) {
			await this.pagesTranslationsService.put(page.id, payload.translations)
		}

		return page
	}

	public async remove(id: number): Promise<void> {
		await this.pagesRepository.delete(id)
	}
}
