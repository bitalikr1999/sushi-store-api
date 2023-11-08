import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IMediaRepository, IMediaService } from 'src/domain/media/typing'
import { MEDIA_REPOSITORY, MEDIA_SERVICE } from 'src/domain/media/typing/consts'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { FinishFileUploadDto, GetLinkToUploadFileDto, GetMediaParams } from './dto'
import { Brackets } from 'typeorm'
import { FileStorageService, RedisService } from 'src/libs'
import * as randomstring from 'randomstring'
import { transformFileUrl } from 'src/shared/transforms'

@Injectable()
export class RestAdminMediaService {
	@Inject(MEDIA_REPOSITORY)
	private mediaRepository: IMediaRepository

	@Inject(MEDIA_SERVICE)
	private mediaService: IMediaService

	constructor(
		private readonly filesStorageService: FileStorageService,
		private readonly redisService: RedisService,
	) {}

	public async getList(pagination: IPagination, dto: GetMediaParams) {
		const query = this.mediaRepository.createQueryBuilder('it').where('it.id IS NOT NULL')

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.url ILIKE :st', {
						st: prepareSearchString(pagination.searchString),
					})
					qb.orWhere('it.type ILIKE :st')
				}),
			)
		}

		if (dto.userId) {
			query.andWhere('it.userId = :userId', { userId: dto.userId })
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return {
			items: items.map(it => {
				return {
					...it,
					path: it.url,
					url: transformFileUrl(it.url),
				}
			}),
			count,
		}
	}

	public async getLinkToUploadFile(userId: number, dto: GetLinkToUploadFileDto) {
		try {
			const { presignedUrl, resultUrl } =
				await this.filesStorageService.getPresignedUrlForPutObject('media', dto.filename)

			const uploadId = randomstring.generate({
				length: 24,
				charset: 'alphabetic',
				capitalization: 'uppercase',
			})

			await this.redisService.set(
				uploadId,
				JSON.stringify({
					resultUrl,
					name: dto.filename,
					type: dto.type,
					userId,
				}),
				60 * 60 * 2,
			)

			return {
				presignedUrl,
				uploadId,
			}
		} catch (e) {
			console.log('Error', e)
			throw e
		}
	}

	public async finishUploadFile(userId: number, dto: FinishFileUploadDto) {
		const _data = await this.redisService.get(dto.uploadId)
		if (!_data) throw new NotFoundException('Upload id invalid')

		const data = JSON.parse(_data)

		if (data.userId !== userId) throw new BadRequestException()

		await this.mediaService.put({
			url: data.resultUrl,
			name: data.name,
			type: data.type,
			userId,
		})

		await this.redisService.del(dto.uploadId)
	}

	public async remove(id: number) {
		const media = await this.mediaRepository.findOne({ where: { id } })

		this.filesStorageService.removeObject(media.url)
		await this.mediaService.remove(id)
	}
}
