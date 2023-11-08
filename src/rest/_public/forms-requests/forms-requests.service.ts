import { Inject, Injectable } from '@nestjs/common'
import { FORM_REQUESTS_SERVICE, IFormRequestsService } from 'src/domain/forms/typing'
import { SendFormPayloadDto } from './dto'

@Injectable()
export class RestFormsRequestsService {
	@Inject(FORM_REQUESTS_SERVICE)
	private readonly formsRequestsService: IFormRequestsService

	public async send(payload: SendFormPayloadDto) {
		await this.formsRequestsService.create({
			form: payload.form,
			content: payload.content,

			title: payload.title,
			data: {
				pageUrl: payload.pageUrl,
			},

			userName: payload.userName,
			userEmail: payload.userEmail,
			userPhoneNumber: payload.userPhoneNumber,
		})
	}
}
