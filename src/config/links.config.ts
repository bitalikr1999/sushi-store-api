import { getEnv } from 'src/shared'

const siteUrl = getEnv('SITE_URL')
const adminUrl = getEnv('ADMIN_URL')

export const linksConfig = {
	page: (key: string) => `${siteUrl}/${key}`,
	productCategory: (key: string) => `${siteUrl}/products/${key}`,
	product: (key: string) => `${siteUrl}/products/single/${key}`,

	admin: path => `${adminUrl}/${path}`,
	adminOrder: id => `${adminUrl}/orders/${id}`,
}
