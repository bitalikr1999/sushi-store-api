import { Inject, Injectable } from '@nestjs/common'
import {
	FORM_REQUESTS_REPOSITORY,
	FormRequestStatus,
	ICreateFormRequestPayload,
	IFormRequestsRepository,
	IFormRequestsService,
} from '../typing'

@Injectable()
export class FormRequestsService implements IFormRequestsService {
	@Inject(FORM_REQUESTS_REPOSITORY)
	private formRequestsRepository: IFormRequestsRepository

	public async create(payload: ICreateFormRequestPayload): Promise<void> {
		await this.formRequestsRepository.insert({
			form: payload.form,
			content: payload.content,

			title: payload.title,
			data: payload.data,

			userName: payload.userName,
			userEmail: payload.userEmail,
			userPhoneNumber: payload.userPhoneNumber,

			fromUserId: payload.fromUserId,
		})
	}

	public async updateStatus(id: number, status: FormRequestStatus): Promise<void> {
		await this.formRequestsRepository.update(id, { status })
	}
}
