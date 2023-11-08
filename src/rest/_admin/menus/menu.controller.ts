import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RestAdminMenuService } from './menu.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { IPagination, ReqPagination } from 'src/shared'
import { CreateMenuDto, CreateMenuItemDto, EditMenuItemDto } from './dto'

@ApiTags('ADMIN | Menu')
@Controller('admin/menu')
export class RestAdminMenuController {
	constructor(private readonly restAdminMenuService: RestAdminMenuService) {}
	@Get('list')
	@AuthGuard()
	public list(@ReqPagination() pagination: IPagination) {
		return this.restAdminMenuService.menusList(pagination)
	}

	@Post()
	@AuthGuard()
	public createMenu(@Body() dto: CreateMenuDto) {
		return this.restAdminMenuService.createMenu(dto)
	}

	@Delete(':id')
	@AuthGuard()
	public remove(@Param('id') id: number) {
		return this.restAdminMenuService.removeMenu(id)
	}

	@Post('items')
	@AuthGuard()
	public createMenuItem(@Body() dto: CreateMenuItemDto) {
		return this.restAdminMenuService.createMenuItem(dto)
	}

	@Patch('items/:id')
	@AuthGuard()
	public update(@Param('id') id: number, @Body() dto: EditMenuItemDto) {
		return this.restAdminMenuService.updateMenuItem(id, dto)
	}

	@Get(':id')
	@AuthGuard()
	public getMenuById(@Param('id') id: number) {
		return this.restAdminMenuService.getMenu(id)
	}

	@Delete('items/:id')
	@AuthGuard()
	public removeMenuItems(@Param('id') id: number) {
		return this.restAdminMenuService.removeMenuItems(id)
	}
}
