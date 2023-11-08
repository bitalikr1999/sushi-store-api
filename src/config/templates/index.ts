import { ContentFieldType } from 'src/domain/content/typing/enums'
import { productsTemplates } from './products.templates'
import { postsTeamplate } from './posts.teamplates'
import { homeTemplate } from './home.template'

export enum PageTemplate {
	AboutUs = 'aboutUs',
	Home = 'home',
	Contacts = 'contacts',
	Single = 'single',
}

const contactsTemplate = [
	{
		type: ContentFieldType.Reapeter,
		label: 'Контакти',
		reapeterTemplate: [
			{
				type: ContentFieldType.Text,
				label: 'Назва',
				key: 'name',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Text,
				label: 'Номер',
				key: 'phoneNumbers',
				disabledTranslates: true,
			},
		],
		key: 'contacts',
	},
]

export const templatesConfig = {
	values: Object.values(PageTemplate),
	templates: {
		[PageTemplate.Home]: homeTemplate,
		[PageTemplate.Contacts]: contactsTemplate,
		...postsTeamplate,
		...productsTemplates,
	},
}
