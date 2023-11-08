import { Controller, Get, Next, Param, Res } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { PublicPagesService } from './pages.service'
import { Lang } from 'src/shared'
import { IRequestUser } from 'src/domain/sessions/typing'
import { ReqUserData } from 'src/domain/sessions/decorators'

@Controller()
export class PublicPagesController {
	constructor(private publicPagesService: PublicPagesService) {}

	@Get('')
	public async home(@Res() res: Response, @ReqUserData() userData: IRequestUser) {
		const data = await this.publicPagesService.getHome(userData)
		return res.render('pages/home', data)
	}

	@Get(':key')
	public async root(
		@Param('key') key: string,
		@Res() res: Response,
		@Next() next: NextFunction,
		@ReqUserData() userData: IRequestUser,
	) {
		try {
			const page = await this.publicPagesService.getPage(key, Lang.uk, userData)
			return res.render(`templates/${page.template}`, page)
		} catch (e) {
			next()
		}
	}

	@Get('*')
	public async notFound(@Res() res: Response, @ReqUserData() userData: IRequestUser) {
		const data = await this.publicPagesService.getHome(userData)
		return res.render('pages/404', data)
	}
}
