import { FormRequestStatus } from '../enums'

export interface IFormRequestsService {
	create(payload: ICreateFormRequestPayload): Promise<void>
	updateStatus(id: number, status: FormRequestStatus): Promise<void>
}

export interface ICreateFormRequestPayload {
	form: string
	content: string

	title?: string
	data?: any

	userName?: string
	userEmail?: string
	userPhoneNumber?: string

	fromUserId?: number
}
