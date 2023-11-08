import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { FinishFileUploadDto, GetLinkToUploadFileDto, GetMediaParams } from './dto'
import { RestAdminMediaService } from './media.service'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'

@ApiTags('ADMIN | Media')
@Controller('admin/media')
export class RestAdminMediaController {
	constructor(private restAdminMediaService: RestAdminMediaService) {}

	@ApiOperation({ summary: 'Get link' })
	@ApiResponse({
		status: 201,
		description: 'Return link to upload',
	})
	@AuthGuard()
	@Put('start-upload-file')
	public create(@ReqUser() id: number, @Body() dto: GetLinkToUploadFileDto) {
		return this.restAdminMediaService.getLinkToUploadFile(id, dto)
	}

	@AuthGuard()
	@Put('/finish-upload-file')
	public async finishUploadFile(@ReqUser() id: number, @Body() dto: FinishFileUploadDto) {
		return this.restAdminMediaService.finishUploadFile(id, dto)
	}

	@ApiOperation({ summary: 'Delete page' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restAdminMediaService.remove(id)
	}

	@ApiOperation({ summary: 'Get pages list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination, @Query() dto: GetMediaParams) {
		return this.restAdminMediaService.getList(pagination, dto)
	}
}
