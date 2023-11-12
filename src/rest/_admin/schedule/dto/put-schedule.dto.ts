import { DtoProperty } from 'src/shared'

export class PutScheduleShiftPayloadDto {
	@DtoProperty()
	date: string

	@DtoProperty()
	start: number

	@DtoProperty()
	end: number

	@DtoProperty()
	isClosed: boolean
}
