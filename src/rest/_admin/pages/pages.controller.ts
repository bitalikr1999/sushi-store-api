import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminPagesService } from './pages.service'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'
import { CreatePagePayloadDto, UpdatePagePayloadDto } from './dto'
import { AuthGuard } from 'src/domain/sessions/decorators'

@ApiTags('ADMIN | Pages')
@Controller('admin/pages')
export class RestAdminPagesController {
	constructor(private readonly restAdminPagesService: RestAdminPagesService) {}

	@ApiOperation({ summary: 'Create page' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@ReqUser() userId: number, @Body() dto: CreatePagePayloadDto) {
		return this.restAdminPagesService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Update page' })
	@ApiResponse({
		status: 200,
	})
	@Patch(':id')
	@AuthGuard()
	public update(
		@ReqUser() userId: number,
		@Param('id') id: number,
		@Body() dto: UpdatePagePayloadDto,
	) {
		return this.restAdminPagesService.update(id, userId, dto)
	}

	@ApiOperation({ summary: 'Delete page' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restAdminPagesService.remove(id)
	}

	@ApiOperation({ summary: 'Get pages list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination) {
		return this.restAdminPagesService.getList(pagination)
	}

	@ApiOperation({ summary: 'Get pages list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get(':id')
	public getOne(@Param('id') id: number) {
		return this.restAdminPagesService.getOne(id)
	}
}
