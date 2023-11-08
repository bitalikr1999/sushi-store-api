import { Lang } from 'src/shared'
import { IContentField } from '../typing'
import { ContentFieldType } from '../typing/enums'

const prepareFieldContent = (type: ContentFieldType, value: any, lang: Lang) => {
	if ([ContentFieldType.Text, ContentFieldType.Textarea].includes(type)) {
		if (!value) return ''
		if (typeof value === 'string') return value
		else if (value[lang]) return value[lang]
		else {
			const keys = Object.keys(value)
			return value[keys[0]]
		}
	}
	if (type === ContentFieldType.Image) return value
}

export const prepareContentItem = (type: ContentFieldType, it: IContentField, lang: Lang) => {
	if (type === ContentFieldType.Reapeter) {
		if (!it.content.value) return null
		return it.content.value.map(fields => {
			const result: Record<string, any> = {}
			fields.map(it => {
				result[it.key] = prepareFieldContent(it.type, it.value, lang)
			})
			return result
		})
	} else {
		return prepareFieldContent(it.content.type, it.content.value, lang)
	}
}

export const prepareContent = (content: IContentField[], lang: Lang) => {
	const result: Record<string, any> = {}

	content.map(it => {
		try {
			const type = it.content?.type
			result[it.key] = prepareContentItem(type, it, lang)
		} catch (e) {
			console.log(it, e)
		}
	})

	return result
}

export const loadContentRemoteData = async (content: IContentField[], lang: Lang) => {
	const result: Record<string, any> = {}

	await Promise.all(
		result.map(async it => {
			try {
				const type = it.content?.type

				if (type === ContentFieldType.ProductCategory) {
				}

				result[it.key] = prepareContentItem(type, it, lang)
			} catch (e) {
				console.log(it, e)
			}
		}),
	)

	return result
}
