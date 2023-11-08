import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestAdminPostService } from './post.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'
import { ICreatePostDto, IGetPostListDto, IUpdatePostDto } from './dto'
@ApiTags('ADMIN | Posts')
@Controller('admin/posts')
export class RestAdminPostController {
	constructor(private readonly restPostService: RestAdminPostService) {}

	@ApiOperation({ summary: 'Create post' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@Body() dto: ICreatePostDto, @ReqUser() userId: number) {
		return this.restPostService.create(dto, userId)
	}

	@ApiOperation({ summary: 'Update post' })
	@ApiResponse({
		status: 200,
	})
	@Patch(':id')
	@AuthGuard()
	public update(@Param('id') id: number, @Body() dto: IUpdatePostDto) {
		return this.restPostService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restPostService.delete(id)
	}

	@ApiOperation({ summary: 'Get products list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination, @Query() dto: IGetPostListDto) {
		return this.restPostService.getList(dto, pagination)
	}

	@ApiOperation({ summary: 'Get one' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get(':id')
	public getOne(@Param('id') id: number) {
		return this.restPostService.getOne(id)
	}
}
