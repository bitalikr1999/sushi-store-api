import { DtoProperty } from 'src/shared'

export class AddFavoritePayloadDto {
	@DtoProperty()
	productId: number
}
