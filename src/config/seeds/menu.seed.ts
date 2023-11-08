import { MenuLocations, MenuParent } from 'src/domain/menu/typing'
import { Lang } from 'src/shared'
import { PRODUCTS_CATEGORIES_SEED_DATA } from './products-categories.seed'

export const MENU_SEED_DATA = () => {
	const categoriesChildren = PRODUCTS_CATEGORIES_SEED_DATA.map(it => {
		return {
			key: it.key,
			parentColumn: MenuParent.Menu,
			url: it.key,
			translations: it.translations,
		}
	})

	return [
		{
			key: 'sidebar',
			name: 'Меню категорій',
			location: MenuLocations.Primary,
			children: categoriesChildren,
		},
		{
			key: 'primary_menu',
			name: 'Головне меню',
			location: MenuLocations.Primary,
			children: [
				{
					key: 'products-news',
					parentColumn: MenuParent.Menu,
					url: '/products/news',
					translations: [
						{
							lang: Lang.uk,
							name: 'Новинки',
						},
					],
				},
				{
					key: 'products-discount',
					parentColumn: MenuParent.Menu,
					url: '/products/discounts',
					translations: [
						{
							lang: Lang.uk,
							name: 'Акції',
						},
					],
				},
				{
					key: 'about-us',
					parentColumn: MenuParent.Menu,
					url: '/products/about-us',
					translations: [
						{
							lang: Lang.uk,
							name: 'Про нас',
						},
					],
				},
				{
					key: 'contacts',
					parentColumn: MenuParent.Menu,
					url: '/products/contacts',
					translations: [
						{
							lang: Lang.uk,
							name: 'Контакти',
						},
					],
				},
			],
		},
	]
}
