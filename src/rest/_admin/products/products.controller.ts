import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RestProductsService } from './products.service'
import { ReqUser, ApiImplictPagination, ReqPagination, IPagination } from 'src/shared'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { CreateProductPayloadDto, UpdateProductPayloadDto } from './dto/product-editor.dto'

@ApiTags('ADMIN | Products')
@Controller('admin/products')
export class RestAdminProductsController {
	constructor(private readonly restProductsService: RestProductsService) {}

	@ApiOperation({ summary: 'Create product' })
	@ApiResponse({
		status: 201,
	})
	@Post()
	@AuthGuard()
	public create(@ReqUser() userId: number, @Body() dto: CreateProductPayloadDto) {
		return this.restProductsService.create(userId, dto)
	}

	@ApiOperation({ summary: 'Update product' })
	@ApiResponse({
		status: 200,
	})
	@Patch(':id')
	@AuthGuard()
	public update(@Param('id') id: number, @Body() dto: UpdateProductPayloadDto) {
		return this.restProductsService.update(id, dto)
	}

	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({
		status: 200,
	})
	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restProductsService.delete(id)
	}

	@ApiOperation({ summary: 'Get products list' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get()
	public list(@ReqPagination() pagination: IPagination) {
		return this.restProductsService.getList(pagination)
	}

	@ApiOperation({ summary: 'Get one' })
	@ApiImplictPagination()
	@ApiResponse({
		status: 200,
	})
	@AuthGuard()
	@Get(':id')
	public getOne(@Param('id') id: number) {
		return this.restProductsService.getOne(id)
	}
}
