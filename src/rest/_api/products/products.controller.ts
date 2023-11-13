import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiProductsService } from './products.service'
import { IPagination, ReqPagination } from 'src/shared'
import { GetProductsCategoriesParamsDto, GetProductsParamsDto } from './dto'

@ApiTags('API | Products')
@Controller('api/products')
export class ApiProductsController {
	constructor(private readonly service: ApiProductsService) {}

	@Get('')
	public list(@ReqPagination() pagination: IPagination, @Query() params: GetProductsParamsDto) {
		return this.service.getList(pagination, params)
	}

	@Get('categories')
	public categories(@Query() dto: GetProductsCategoriesParamsDto) {
		return this.service.getCategories(dto)
	}
}
