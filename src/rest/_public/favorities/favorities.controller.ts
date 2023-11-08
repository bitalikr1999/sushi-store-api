import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PublicFavoritiesService } from './favorities.service'
import { AddFavoritePayloadDto } from './dto'
import { ReqUserData } from 'src/domain/sessions/decorators'
import { IRequestUser } from 'src/domain/sessions/typing'
import { IPagination, ReqPagination, ReqUser } from 'src/shared'

@ApiTags('PUBLIC | Favorities')
@Controller('api/favorities')
export class RestPublicFavoritiesController {
	constructor(private readonly publicFavoritiesService: PublicFavoritiesService) {}

	@Post('')
	public async add(@Body() dto: AddFavoritePayloadDto, @ReqUserData() userData: IRequestUser) {
		console.log(userData)
		return await this.publicFavoritiesService.toggle(userData.fixedUserId, dto)
	}

	@Get('ids')
	public async getIds(@ReqUserData() userData: IRequestUser) {
		return this.publicFavoritiesService.getIds(userData.fixedUserId)
	}

	@Get('')
	public async getFavorites(
		@ReqUserData() userData: IRequestUser,
		@ReqPagination() pagination: IPagination,
	) {
		return await this.publicFavoritiesService.getFavorities(userData.fixedUserId, pagination)
	}
}
