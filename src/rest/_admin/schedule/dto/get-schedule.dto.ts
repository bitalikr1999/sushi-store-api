import { DtoProperty } from 'src/shared'

export class GetScheduleParamsDto {
	@DtoProperty()
	from: number

	@DtoProperty()
	to: number
}
