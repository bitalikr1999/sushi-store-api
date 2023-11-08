import { ContentFieldType } from 'src/domain/content/typing/enums'

export const postsTeamplate = {
	floor_slabs: {
		type: ContentFieldType.Reapeter,
		label: 'Таблиця',
		key: 'table',
		reapeterTemplate: [
			{
				type: ContentFieldType.Text,
				label: 'Заголовок',
				key: 'title',
				style: {
					minWidth: 200,
				},
			},
			{
				type: ContentFieldType.Textarea,
				label: 'Опис',
				key: 'description',
				style: {
					minWidth: 200,
				},
			},
			{
				type: ContentFieldType.Image,
				label: 'Основне фото',
				key: 'mainImg',
				style: {
					minWidth: 200,
				},
			},
		],
	},
}
