import { SelectQueryBuilder } from 'typeorm'
import { IPagination, IPaginationResult } from '../interfaces'
import * as _ from 'lodash'

export const paginateAndGetMany = async <T>(
	oldQuery: SelectQueryBuilder<T>,
	pagination: IPagination,
	fieldPrefix = '',
): Promise<IPaginationResult<T>> => {
	let query = oldQuery.skip(pagination.skip).take(pagination.limit)

	if (pagination.sortField) {
		const sort: 'ASC' | 'DESC' = pagination.sort === 'ASC' ? 'ASC' : 'DESC'
		query = query.orderBy(fieldPrefix + '.' + pagination.sortField, sort)
	}

	const [items, count] = await query.getManyAndCount()
	return { items, count }
}

export const prepareSearchString = (searchString: string) => `%${searchString}%`

export const generatePaginationResult = (
	pagination: IPagination,
	url: string,
	count: number,
	params?: Record<string, string>,
) => {
	const result: any = { ...pagination }

	let query: Record<string, any> = {
		page: pagination.page,
		limit: pagination.limit,
		searchString: pagination.searchString,
		sort: pagination.sort,
		sortField: pagination.sortField,
		...params,
	}

	query = _.pickBy(query, _.identity)

	result.currentPageUrl = `${url}?${getQueryLink(query, {})}`

	if (pagination.page > 1) {
		result.prevLink = `${url}?${getQueryLink(query, { page: Number(pagination.page) - 1 })}`
	}

	if (!isLastPage(pagination, count)) {
		result.nextLink = `${url}?${getQueryLink(query, { page: Number(pagination.page) + 1 })}`
	}

	const btns = getPaginationBtns(pagination, count)
	result.btnsLinks = btns.map(it => {
		return {
			url: `${url}?${getQueryLink(query, { page: it })}`,
			isActive: Number(it) === Number(pagination.page),
			label: it,
		}
	})

	return result
}

const getQueryLink = (data: Record<string, any>, data2: Record<string, any>) => {
	const resData = Object.assign(data, data2)
	const arr = []
	Object.keys(resData).map(key => arr.push(`${key}=${resData[key]}`))
	return arr.join('&')
}

const getPagesCount = (pagination: IPagination, count: number) => {
	return Math.ceil(count / pagination.limit)
}

const isLastPage = (pagination: IPagination, count: number) => {
	const pagesCount = getPagesCount(pagination, count)
	return pagination.page >= pagesCount
}
const isFirstPage = (pagination: IPagination) => {
	return !pagination.page || Number(pagination.page) === 1
}

const getPaginationBtns = (pagination: IPagination, count: number) => {
	const result = []
	const pagesCount = getPagesCount(pagination, count)
	let start = pagination.page - 1
	if (isFirstPage(pagination)) start = 1
	if (isLastPage(pagination, count)) start = pagesCount - 3

	for (let index = 0; index <= 7; index++) {
		const toPush = start + index
		if (toPush <= pagesCount && toPush > 0) result.push(start + index)
	}

	return result
}
