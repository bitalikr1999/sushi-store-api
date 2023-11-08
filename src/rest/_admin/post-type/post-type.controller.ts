import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminPostTypeService } from './post-type.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'
import { CreatePostTypeDto, UpdatePostTypeDto } from './dto'

@ApiTags('ADMIN | Post Type')
@Controller('admin/posts-types')
export class RestAdminPostTypeController {
	constructor(private readonly restAdminPostTypeService: RestAdminPostTypeService) {}

	@ApiOperation({ summary: 'Create post type' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@ReqUser() userId: number, @Body() dto: CreatePostTypeDto) {
		return this.restAdminPostTypeService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Update post type' })
	@ApiResponse({
		status: 200,
	})
	@Patch(':id')
	@AuthGuard()
	public update(
		@ReqUser() userId: number,
		@Param('id') id: number,
		@Body() dto: UpdatePostTypeDto,
	) {
		return this.restAdminPostTypeService.update(userId, id, dto)
	}

	@ApiOperation({ summary: 'Delete post type' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restAdminPostTypeService.delete(id)
	}

	@ApiOperation({ summary: 'Get post type list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination) {
		return this.restAdminPostTypeService.getList(pagination)
	}
}
