import { Controller, Get, Response } from '@nestjs/common'
import { SitemapService } from './sitemap.service'

@Controller('sitemap.xml')
export class SitemapController {
	constructor(private readonly sitemapService: SitemapService) {}

	@Get('')
	public async get(@Response() res) {
		res.set('Content-Type', 'text/xml')
		const xml = await this.sitemapService.get()
		res.send(xml)
	}
}
