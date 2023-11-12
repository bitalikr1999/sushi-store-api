import { AdminRestContentModule } from './_admin/content/content.module'
import { RestAdminFormRequestsModule } from './_admin/forms-requests/form-requests.module'
import { RestAdminGalleryModule } from './_admin/gallery/gallery.module'
import { RestAdminMediaModule } from './_admin/media/media.module'
import { RestAdminMenuModule } from './_admin/menus/menu.module'
import { RestAdminOrdersModule } from './_admin/orders/orders.module'
import { AdminRestPagesModule } from './_admin/pages/pages.module'
import { RestAdminPostCategoriesModule } from './_admin/post-categories/post-categories.module'
import { RestAdminPostTypeModule } from './_admin/post-type/post-type.module'
import { RestAdminPostModule } from './_admin/post/post.module'
import { RestAdminProductCategoriesModule } from './_admin/products-categories/products-categories.module'
import { RestAdminProductsModule } from './_admin/products/products.module'
import { RestAdminScheduleModule } from './_admin/schedule/schedule.module'
import { RestAdminSettingsModule } from './_admin/settings/settings.module'
import { RestAdminUsersModule } from './_admin/users/admin-users.module'
import { ApiBucketModule } from './_api/bucket/bucket.module'
import { ApiPublicOrdersModule } from './_api/orders/orders.module'
import { ApiProductsModule } from './_api/products/products.module'
import { RestApiScheduleModule } from './_api/schedule/schedule.module'

import { AccountModule } from './account/app-account.module'
import { AuthModule } from './auth/auth.module'
import { RestNovaPoshtaModule } from './nova-poshta/nova-poshta.module'

export const REST_MODULES = () => [
	AuthModule.forRoot(),
	AccountModule.forRoot(),
	RestNovaPoshtaModule.forRoot(),

	AdminRestContentModule.forRoot(),
	AdminRestPagesModule.forRoot(),

	RestAdminUsersModule.forRoot(),
	RestAdminMediaModule.forRoot(),
	RestAdminProductCategoriesModule.forRoot(),
	RestAdminProductsModule.forRoot(),
	RestAdminGalleryModule.forRoot(),
	RestAdminFormRequestsModule.forRoot(),
	RestAdminPostModule.forRoot(),
	RestAdminPostCategoriesModule.forRoot(),
	RestAdminPostTypeModule.forRoot(),
	RestAdminOrdersModule.forRoot(),
	RestAdminMenuModule.forFeature(),
	RestAdminSettingsModule.forRoot(),
	RestAdminScheduleModule.forRoot(),

	ApiProductsModule.forRoot(),
	ApiBucketModule.forRoot(),
	ApiPublicOrdersModule.forRoot(),
	RestApiScheduleModule.forRoot(),
]
