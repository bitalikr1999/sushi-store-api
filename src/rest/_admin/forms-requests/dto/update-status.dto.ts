import { FormRequestStatus } from 'src/domain/forms/typing'
import { DtoProperty } from 'src/shared'

export class UpdateStatusFormRequestPayloadDto {
	@DtoProperty({ enum: FormRequestStatus })
	status: FormRequestStatus
}
