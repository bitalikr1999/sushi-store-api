import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminContentService } from './content.service'
import { GetContentParamsDto, GetTemplateParamsDto, PutContentPayloadDto } from './dtos'
import { ReqUser } from 'src/shared'
import { ClearContentPayload } from './dtos/clear-content.dto'

@ApiTags('ADMIN | Content')
@Controller('admin/content')
export class AdminContentController {
	constructor(private readonly service: AdminContentService) {}

	@ApiOperation({ summary: 'Put content' })
	@ApiResponse({
		status: 201,
	})
	@Put()
	public put(@ReqUser() userId: number, @Body() dto: PutContentPayloadDto) {
		return this.service.put(userId, dto)
	}

	@ApiOperation({ summary: 'Get content' })
	@ApiResponse({
		status: 201,
	})
	@Get()
	public get(@Query() dto: GetContentParamsDto) {
		return this.service.getContent(dto)
	}

	@ApiOperation({ summary: 'Get content templates' })
	@ApiResponse({
		status: 201,
	})
	@Get('templates')
	public getTemplates() {
		return this.service.getTemplatesList()
	}

	@ApiOperation({ summary: 'Get content templates' })
	@ApiResponse({
		status: 201,
	})
	@Get('template')
	public getTemplate(@Query() dto: GetTemplateParamsDto) {
		return this.service.getTemplate(dto)
	}

	@ApiOperation({ summary: 'Clear content' })
	@ApiResponse({
		status: 201,
	})
	@Delete()
	public clear(@Query() dto: ClearContentPayload) {
		return this.service.clear(dto)
	}
}
