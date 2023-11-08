import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GetBucketPreviewDto } from './dto'
import { RestPublicBucketService } from './bucket.service'

@Controller('api/bucket')
export class RestPublicBucketController {
	constructor(private readonly restPublicBucketService: RestPublicBucketService) {}

	@ApiOperation({ summary: 'Get bucket preview' })
	@ApiResponse({
		status: 201,
	})
	@Post('preview')
	public put(@Body() dto: GetBucketPreviewDto) {
		return this.restPublicBucketService.getPreview(dto)
	}
}
