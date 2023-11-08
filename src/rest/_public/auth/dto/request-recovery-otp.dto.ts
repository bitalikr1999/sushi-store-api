import { IsString } from 'class-validator'
import { DtoProperty } from 'src/shared'

export class RequestRecoveryOTPPayloadDto {
	@DtoProperty()
	@IsString()
	email: string
}
