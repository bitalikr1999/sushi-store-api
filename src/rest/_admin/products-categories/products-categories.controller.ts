import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestProductsCategoriesService } from './products-categories.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ReqUser } from 'src/shared'
import { CreateProductCategoryPayloadDto } from './dto'

@ApiTags('ADMIN | Products categories')
@Controller('admin/products-categories')
export class AdminProductsCategoriesController {
	constructor(private service: RestProductsCategoriesService) {}

	@ApiOperation({ summary: 'Create product category' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@ReqUser() userId: number, @Body() dto: CreateProductCategoryPayloadDto) {
		return this.service.create(userId, dto)
	}

	@ApiOperation({ summary: 'Update product category' })
	@ApiResponse({
		status: 201,
	})
	@Patch(':id')
	@AuthGuard()
	public update(@Param('id') id: number, @Body() dto: CreateProductCategoryPayloadDto) {
		return this.service.update(id, dto)
	}

	@ApiOperation({ summary: 'Get product categories tree view' })
	@ApiResponse({
		status: 200,
	})
	@Get()
	@AuthGuard()
	public get() {
		return this.service.getFullList()
	}

	@ApiOperation({ summary: 'Delete product category' })
	@ApiResponse({
		status: 201,
	})
	@Delete(':id')
	@AuthGuard()
	public delete(@Param('id') id: number) {
		return this.service.delete(id)
	}
}
