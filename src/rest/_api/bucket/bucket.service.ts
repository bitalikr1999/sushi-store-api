import { Inject, Injectable } from '@nestjs/common'
import { GetBucketPreviewDto } from './dto'
import { BUCKET_SERVICE, IBucketService } from 'src/domain/orders/typing'

@Injectable()
export class RestPublicBucketService {
	@Inject(BUCKET_SERVICE)
	private readonly bucketService: IBucketService

	public async getPreview(dto: GetBucketPreviewDto) {
		const result = await this.bucketService.getPreview(dto)

		return result
	}
}
