import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_REPOSITORY } from '../consts'
import {
	IGalleriesRepository,
	IGalleryService,
	IGetGalleryParams,
	IStoreGalleryPayload,
} from '../interface'
import * as _ from 'lodash'
import { transformFileUrl } from 'src/shared/transforms'

@Injectable()
export class GalleryService implements IGalleryService {
	@Inject(GALLERY_REPOSITORY) private readonly galleryRepository: IGalleriesRepository

	public async put(dto: IStoreGalleryPayload) {
		await this.galleryRepository.delete({
			parentId: dto.parentId,
			parentTable: dto.parentTable,
		})

		const toInsert = dto.items.map(it => {
			return {
				parentId: dto.parentId,
				parentTable: dto.parentTable,
				mediaId: it.mediaId,
				order: it.order,
			}
		})

		await this.galleryRepository.insert(toInsert)
	}

	public async delete(id: number) {
		await this.galleryRepository.delete(id)
		return
	}

	public async get(dto: IGetGalleryParams) {
		const gallery = await this.galleryRepository.find({
			where: { parentId: dto.parentId, parentTable: dto.parentTable },
			relations: ['media'],
		})

		return _.defaultTo(
			gallery.map(it => {
				return {
					...it,
					fileUrl: transformFileUrl(it.media?.url),
					media: null,
				}
			}),
			[],
		)
	}
}
