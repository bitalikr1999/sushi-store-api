import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RestAdminPostCategoriesService } from './post-categories.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'
import { CreatePostCategoryDto, UpdatePostCategoryDto } from './dto'

@ApiTags('ADMIN | Post Categories')
@Controller('admin/posts-categories')
export class RestAdminPostCategoriesController {
	constructor(private readonly restAdminPostCategoriesService: RestAdminPostCategoriesService) {}

	@ApiOperation({ summary: 'Create post category' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@ReqUser() userId: number, @Body() dto: CreatePostCategoryDto) {
		return this.restAdminPostCategoriesService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Update post category' })
	@ApiResponse({
		status: 200,
	})
	@Patch(':id')
	@AuthGuard()
	public update(
		@ReqUser() userId: number,
		@Param('id') id: number,
		@Body() dto: UpdatePostCategoryDto,
	) {
		return this.restAdminPostCategoriesService.update(userId, id, dto)
	}

	@ApiOperation({ summary: 'Delete post category' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restAdminPostCategoriesService.delete(id)
	}

	@ApiOperation({ summary: 'Get post category list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination) {
		return this.restAdminPostCategoriesService.getList(pagination)
	}
}
