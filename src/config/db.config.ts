import { CONTENT_ENTITIES } from 'src/domain/content/entities'
import { FAVORITIES_ENTITIES } from 'src/domain/favorities/entities'
import { FORMS_ENTITIES } from 'src/domain/forms/entities'
import { GALLERIES_ENTITIES } from 'src/domain/galleries/entities'
import { MEDIA_ENTITIES } from 'src/domain/media/entities'
import { MENU_ENTITIES } from 'src/domain/menu/entities'
import { ORDERS_ENTITIES } from 'src/domain/orders/entities'
import { PAGES_ENTITIES } from 'src/domain/pages/entity'
import { POSTS_ENITIES } from 'src/domain/posts/entity'
import { PRODUCTS_ENTITIES } from 'src/domain/products/entities'
import { SESSIONS_ENTITIES } from 'src/domain/sessions/entities'
import { SETTINGS_ENTITES } from 'src/domain/settings/entities'
import { SHIPPING_ENTITIES } from 'src/domain/shippings/entities'
import { USERS_ENTITIES } from 'src/domain/users/entities'
import { DatabaseModule } from 'src/libs/database'
import { NP_ENTITIES } from 'src/libs/nova-poshta/entities'

export const getDatabaseConfig = (): Parameters<(typeof DatabaseModule)['forRoot']> => {
	return [
		{
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASS,
			database: process.env.DATABASE_DB,
			synchronize: true,
		},
		[
			...USERS_ENTITIES,
			...SESSIONS_ENTITIES,
			...CONTENT_ENTITIES,
			...PAGES_ENTITIES,
			...MEDIA_ENTITIES,
			...PRODUCTS_ENTITIES,
			...GALLERIES_ENTITIES,
			...FORMS_ENTITIES,
			...POSTS_ENITIES,
			...ORDERS_ENTITIES,
			...MENU_ENTITIES,
			...FAVORITIES_ENTITIES,
			...SHIPPING_ENTITIES,
			...SETTINGS_ENTITES,
			...NP_ENTITIES,
		],
	]
}
