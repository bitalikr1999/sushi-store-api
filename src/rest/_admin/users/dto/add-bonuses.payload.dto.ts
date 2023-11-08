import { DtoProperty } from 'src/shared'

export class AddBonusesPayloadDto {
	@DtoProperty()
	bonuses: number

	@DtoProperty()
	reason: string
}
