import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard, ReqUserData } from 'src/domain/sessions/decorators'
import { UserRole } from 'src/domain/users/typing'
import { ApiImplictPagination, IPagination, ReqPagination, ReqUser } from 'src/shared'
import { AdminUsersService } from './admin-users.service'
import {
	AddBonusesPayloadDto,
	CreateUserPayloadDto,
	CreateUserResultDto,
	GetUsersListParamsDto,
	UpdateUserPayloadDto,
	UpdateUserResultDto,
	UsersListDto,
} from './dto'
import { IRequestUser } from 'src/domain/sessions/typing'

@ApiTags('Admin | Users')
@Controller('admin/users')
export class AdminUsersController {
	constructor(private readonly adminUsersService: AdminUsersService) {}

	@ApiOperation({ summary: 'Get users list with pagination' })
	@ApiOkResponse({
		status: 200,
		description: 'Return users list',
		type: UsersListDto,
	})
	@ApiImplictPagination()
	@AuthGuard()
	@Get()
	public getList(
		@ReqUser() userId: number,
		@ReqPagination() pagination: IPagination,
		@Query() dto: GetUsersListParamsDto,
	): Promise<UsersListDto> {
		return this.adminUsersService.getList(dto, pagination, userId)
	}

	@AuthGuard()
	@Get(':id')
	public async getDetails(@Param('id') id: number) {
		return this.adminUsersService.getUserDetails(id)
	}

	@ApiOperation({ summary: 'Create new user' })
	@ApiOkResponse({
		status: 200,
		description: 'Return created user',
		type: CreateUserResultDto,
	})
	// @RoleGuard(UserRole.Admin)
	@Post()
	public create(@Body() dto: CreateUserPayloadDto) {
		return this.adminUsersService.create(dto)
	}

	@ApiOperation({
		summary: 'Update user',
	})
	@ApiOkResponse({ status: 200, description: 'Return updated user', type: UpdateUserResultDto })
	// @RoleGuard(UserRole.Admin)
	@Patch('/:userId')
	public update(@Param('userId') userId: number, @Body() dto: UpdateUserPayloadDto) {
		return this.adminUsersService.update(userId, dto)
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ status: 200 })
	// @RoleGuard(UserRole.Admin)
	@Delete('/:userId')
	public delete(@Param('userId') userId: number) {
		return this.adminUsersService.forceDelete(userId)
	}

	@ApiOperation({ summary: 'Add bonuses' })
	@ApiOkResponse({ status: 200 })
	@Post(':id/add-bonuses')
	public addBonuses(
		@ReqUserData() user: IRequestUser,
		@Param('id') id: number,
		@Body() dto: AddBonusesPayloadDto,
	) {
		return this.adminUsersService.addBonuses(user.userId, id, dto)
	}
}
