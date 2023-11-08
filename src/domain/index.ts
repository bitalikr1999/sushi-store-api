import { getEnv } from 'src/shared'
import { SessionsModule } from './sessions/sessions.module'
import { UsersModule } from './users/users.module'
import { ContentModule } from './content/content.module'
import { PagesModule } from './pages/pages.module'
import { MediaModule } from './media/media.module'
import { ProductsModule } from './products/products.module'
import { GalleryModule } from './galleries/gallery.module'
import { FormsModule } from './forms/forms.module'
import { PostsModule } from './posts/posts.module'
import { MenuModule } from './menu/menu.module'
import { FavoritiesModule } from './favorities/favorities.module'
import { SettingsModule } from './settings/settings.module'

export const DOMAIN_MODULES = () => [
	UsersModule.forRoot({ passwordHashSalt: getEnv('LOCAL_HASH_SALT') }),
	SessionsModule.forRoot(),
	ContentModule.forRoot(),
	PagesModule.forRoot(),
	MediaModule.forRoot(),
	ProductsModule.forRoot(),
	GalleryModule.forRoot(),
	FormsModule.forRoot(),
	PostsModule.forRoot(),
	MenuModule.forRoot(),
	FavoritiesModule.forRoot(),
	SettingsModule.forRoot(),
]
