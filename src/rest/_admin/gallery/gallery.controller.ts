import { Body, Controller, Get, Injectable, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminGalleryService } from './gallery.service'
import { GetGalleryParamsDto, GetGalleryResponseDto, PutGalleryPaylodDto } from './dto'
import { AuthGuard } from 'src/domain/sessions/decorators'

@ApiTags('ADMIN | Gallery ')
@Controller('admin/gallery')
export class RestAdminGalleryController {
	constructor(private readonly service: RestAdminGalleryService) {}

	@ApiOperation({ summary: 'Get gallery' })
	@ApiResponse({
		status: 201,
		type: GetGalleryResponseDto,
	})
	@AuthGuard()
	@Get('')
	public get(@Query() dto: GetGalleryParamsDto) {
		return this.service.get(dto)
	}

	@ApiOperation({ summary: 'Put gallery items' })
	@ApiResponse({
		status: 201,
	})
	@AuthGuard()
	@Put()
	public put(@Body() dto: PutGalleryPaylodDto) {
		return this.service.put(dto)
	}
}
