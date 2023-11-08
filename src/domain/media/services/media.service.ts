import { Inject, Injectable } from '@nestjs/common'
import { IMediaRepository, IMediaService, IPutMediaPayload } from '../typing'
import { MEDIA_REPOSITORY } from '../typing/consts'

@Injectable()
export class MediaService implements IMediaService {
	@Inject(MEDIA_REPOSITORY)
	private mediaRepository: IMediaRepository

	public async put(payload: IPutMediaPayload) {
		await this.mediaRepository.insert({
			type: payload.type,
			name: payload.name,
			userId: payload.userId,
			url: payload.url,
		})
	}

	public async remove(id: number) {
		await this.mediaRepository.delete(id)
	}
}
