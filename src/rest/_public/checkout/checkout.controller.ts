import { Controller, Get, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CheckoutService } from './checkout.service'
import { Response } from 'express'
import { ReqUserData } from 'src/domain/sessions/decorators'
import { IRequestUser } from 'src/domain/sessions/typing'

@ApiTags('PUBLIC | Checkout')
@Controller('checkout')
export class PublicCheckoutController {
	constructor(private readonly service: CheckoutService) {}

	@ApiOperation({ summary: 'Create order' })
	@ApiResponse({
		status: 201,
	})
	@Get('')
	public async checkout(@Res() res: Response, @ReqUserData() userData: IRequestUser) {
		const data = await this.service.getCheckoutPageData(userData)
		return res.render('pages/products/checkout', data)
	}

	@ApiOperation({ summary: 'Create order finish' })
	@ApiResponse({
		status: 201,
	})
	@Get('confirmation')
	public async checkoutFinish(@Res() res: Response, @ReqUserData() userData: IRequestUser) {
		const data = await this.service.getCheckoutPageData(userData)
		return res.render('pages/products/checkout-confirmation', data)
	}

	@ApiOperation({ summary: 'Checkout success page' })
	@ApiResponse({
		status: 201,
	})
	@Get('success')
	public async checkoutSuccess(@Res() res: Response, @ReqUserData() userData: IRequestUser) {
		const data = await this.service.getCheckoutPageData(userData)
		return res.render('pages/products/checkout-success', data)
	}
}
