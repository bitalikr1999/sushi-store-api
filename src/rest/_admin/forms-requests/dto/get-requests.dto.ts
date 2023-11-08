import { FormRequestStatus } from 'src/domain/forms/typing'
import { DtoPropertyOptional } from 'src/shared'

export class GetFormRequestsParamsDto {
	@DtoPropertyOptional()
	status?: FormRequestStatus
}
