export interface INPCity {
	id: string

	name: string

	area: string

	areaRef?: string
	createdAt: string
}

export interface INPDepartment {
	id: string
	cityId: string

	name: string
	number: string

	createdAt: string
}
