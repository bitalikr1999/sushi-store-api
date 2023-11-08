export interface IContentField {
	id: number

	parentTable: string
	parentId: number

	content: any
	key: string

	createdAt: string
	updatedAt: string

	authorId?: number
}
