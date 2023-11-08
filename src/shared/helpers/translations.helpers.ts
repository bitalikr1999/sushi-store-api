import * as _ from 'lodash'
import { Lang } from '../enums'

interface ITranslate {
	lang: Lang
}

export const getTranslate = <T extends ITranslate>(translates: T[], lang: Lang) => {
	try {
		if (!translates || _.isEmpty(translates)) return {} as any as T
		if (translates.length === 1) return translates[0]

		const item = translates.find(it => it.lang === lang)
		if (item) return item

		const enItem = translates.find(it => it.lang === Lang.en)
		if (enItem) return enItem

		return translates[0]
	} catch (e) {
		console.log(e)
		return {} as any as T
	}
}
