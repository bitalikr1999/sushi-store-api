import { Inject, Injectable } from '@nestjs/common'
import { IPagesRepository } from 'src/domain/pages/typing'
import { PAGES_REPOSITORY } from 'src/domain/pages/typing/consts'
import {
	IProductsCategoriesRepository,
	IProductsRepository,
	PRODUCTS_REPOSITORY,
	PRODUCT_CATEGORIES_REPOSITORY,
} from 'src/domain/products/typing'

import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { linksConfig } from 'src/config/links.config'

@Injectable()
export class SitemapService {
	private sitemapCache: any

	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(PAGES_REPOSITORY)
	private readonly pagesRepository: IPagesRepository

	@Inject(PRODUCT_CATEGORIES_REPOSITORY)
	private readonly productsCategoriesRepository: IProductsCategoriesRepository

	public async get() {
		if (this.sitemapCache) {
			return this.sitemapCache
		}

		const smStream = new SitemapStream({})

		await this.addPagesLinks(smStream)
		await this.addCategoriesLinks(smStream)
		await this.addProductsLinks(smStream)

		smStream.end()
		const sm = await streamToPromise(smStream)

		this.sitemapCache = sm

		return this.sitemapCache
	}

	private async addPagesLinks(stream) {
		const pages = await this.pagesRepository.find()

		pages.forEach(it => {
			stream.write({ url: linksConfig.page(it.key), changefreq: 'weekly', priority: 0.7 })
		})
	}

	private async addCategoriesLinks(stream) {
		const categories = await this.productsCategoriesRepository.find()

		categories.forEach(it => {
			stream.write({
				url: linksConfig.productCategory(it.key),
				changefreq: 'weekly',
				priority: 0.5,
			})
		})
	}

	private async addProductsLinks(stream) {
		const products = await this.productsRepository.find({ select: ['key'] })

		products.forEach(it => {
			stream.write({
				url: linksConfig.product(it.key),
				changefreq: 'weekly',
				priority: 0.4,
			})
		})
	}
}
