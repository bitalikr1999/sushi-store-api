import { FormRequestStatus } from '../enums'

export interface IFormRequest {
	id: number

	form: string
	content: string

	title?: string
	data?: any

	userName?: string
	userEmail?: string
	userPhoneNumber?: string

	fromUserId?: number
	createdAt: string
	updatedAt: string

	status: FormRequestStatus

	responsibleManagerId?: number
}
