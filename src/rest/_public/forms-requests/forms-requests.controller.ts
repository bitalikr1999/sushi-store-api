import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestFormsRequestsService } from './forms-requests.service'
import { Body, Controller, Post } from '@nestjs/common'
import { SendFormPayloadDto } from './dto'

@ApiTags('PUBLIC | Form requests')
@Controller('/public/api/forms-requests')
export class RestPublicFormsRequestsController {
	constructor(private readonly service: RestFormsRequestsService) {}

	@ApiOperation({ summary: 'Create form' })
	@ApiResponse({
		status: 201,
	})
	@Post('')
	public put(@Body() dto: SendFormPayloadDto) {
		return this.service.send(dto)
	}
}
