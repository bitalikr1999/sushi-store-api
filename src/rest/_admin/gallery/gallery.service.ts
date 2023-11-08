import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { GetGalleryParamsDto, GetGalleryResponseDto, PutGalleryPaylodDto } from './dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class RestAdminGalleryService {
	@Inject(GALLERY_SERVICE)
	private readonly galleryService: IGalleryService

	public async get(dto: GetGalleryParamsDto) {
		const items = await this.galleryService.get({
			parentId: dto.parentId,
			parentTable: dto.parentTable,
		})

		return plainToInstance(
			GetGalleryResponseDto,
			{ items, count: items.length },
			{ excludeExtraneousValues: true },
		)
	}

	public async put(dto: PutGalleryPaylodDto) {
		await this.galleryService.put(dto)
	}
}
