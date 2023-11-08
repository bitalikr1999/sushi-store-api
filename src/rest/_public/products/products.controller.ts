import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { PublicProductsService } from './products.service'
import { GetProductsPageParams } from './dto/get-product-page.dto'
import { IPagination, ReqPagination } from 'src/shared'
import { IRequestUser } from 'src/domain/sessions/typing'
import { ReqUserData } from 'src/domain/sessions/decorators'

@Controller('products')
export class PublicProductsController {
	constructor(private publicProductsService: PublicProductsService) {}

	@Get('single/:key')
	public async getSingle(
		@Res() res: Response,
		@Param('key') key: string,
		@ReqUserData() userData: IRequestUser,
	) {
		const data = await this.publicProductsService.getProduct(key, userData)
		return res.render('pages/products/product-single', data)
	}

	@Get('news')
	public async getNews(
		@Res() res: Response,
		@ReqPagination() pagination: IPagination,
		@ReqUserData() userData: IRequestUser,
	) {
		const data = await this.publicProductsService.getProductsNews(pagination, userData)
		return res.render('pages/products/product-news', data)
	}

	@Get('discounts')
	public async getDiscountw(
		@Res() res: Response,
		@ReqPagination() pagination: IPagination,
		@ReqUserData() userData: IRequestUser,
		@Query() params: GetProductsPageParams,
	) {
		params.fixedUserId = userData.fixedUserId
		const data = await this.publicProductsService.getProductsDiscountPage(
			params,
			pagination,
			userData,
		)
		return res.render('pages/products/product-discounts', data)
	}

	@Get('favorities')
	public async getFavorities(
		@ReqUserData() userData: IRequestUser,
		@Res() res: Response,
		@ReqPagination() pagination: IPagination,
	) {
		const data = await this.publicProductsService.getFavorities(
			userData.fixedUserId,
			pagination,
			userData,
		)
		return res.render('pages/products/favorities', data)
	}

	@Get('')
	public async get(
		@Res() res: Response,
		@Query() params: GetProductsPageParams,
		@ReqPagination() pagination: IPagination,
		@ReqUserData() userData: IRequestUser,
	) {
		try {
			params.fixedUserId = userData.fixedUserId
			const data = await this.publicProductsService.getProductsCommonPage(
				params,
				pagination,
				userData,
			)
			return res.render('pages/products/products', data)
		} catch (e) {
			console.log(e)
			return res.render('pages/404')
		}
	}

	@Get(':categoryKey')
	public async home(
		@Res() res: Response,
		@Param('categoryKey') categoryKey: string,
		@Query() params: GetProductsPageParams,
		@ReqPagination() pagination: IPagination,
		@ReqUserData() userData: IRequestUser,
	) {
		try {
			params.fixedUserId = userData.fixedUserId
			const data = await this.publicProductsService.getProductsPageData(
				categoryKey,
				params,
				pagination,
				userData,
			)
			return res.render('pages/products/product-category', data)
		} catch (e) {
			console.log(e)
			return res.render('pages/404')
		}
	}
}
