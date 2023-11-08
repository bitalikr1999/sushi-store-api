import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	IPostCreatePayload,
	IPostRepository,
	IPostService,
	IPostToCategoryRepository,
	IPostTranslateRepository,
	POSTS_REPOSITORY,
	POSTS_TRANSLATE_REPOSITORY,
	POST_TO_CATEGORY_REPOSITORY,
} from '../typing'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

@Injectable()
export class PostService implements IPostService {
	@Inject(POSTS_REPOSITORY) private readonly postRepository: IPostRepository
	@Inject(POSTS_TRANSLATE_REPOSITORY)
	private readonly postTranslateRepository: IPostTranslateRepository
	@Inject(POST_TO_CATEGORY_REPOSITORY)
	private readonly postToCategorRepository: IPostToCategoryRepository

	public async create(payload: IPostCreatePayload): Promise<void> {
		const post = await this.postRepository.save(payload)

		if (payload.categoiesId) {
			for await (let categoryId of payload.categoiesId) {
				this.postToCategorRepository.insert({
					postId: post.id,
					categoryId,
				})
			}
		}

		await this.putTranslations(post.id, payload.translations, false)
	}

	public async update(id: number, payload: Partial<IPostCreatePayload>): Promise<void> {
		const post = await this.postRepository.findOne({ where: { id } })

		if (!post) throw new NotFoundException('Post not found')

		const dataEntity = omitBy(omit(payload, ['translations']), isNil)

		if (!isEmpty(payload.translations)) {
			await this.putTranslations(post.id, payload.translations)
		}

		if (!isEmpty(payload.categoiesId)) {
			await this.postToCategorRepository.delete({ postId: post.id })

			for await (let categoryId of payload.categoiesId) {
				this.postToCategorRepository.insert({
					postId: post.id,
					categoryId,
				})
			}
		}

		if (!isEmpty(dataEntity)) {
			await this.postRepository.update(id, dataEntity)
		}
	}

	public async delete(id: number): Promise<void> {
		await this.postRepository.delete({ id })
	}

	private async putTranslations(
		postId: number,
		translates: IPostCreatePayload['translations'],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.postTranslateRepository.delete({ postId })
		const toSave = translates.map(it => ({
			name: it.name,
			postId,
			lang: it.lang,
			description: it.description,
		}))
		await this.postTranslateRepository.insert(toSave)
		return toSave
	}
}
