import { DtoPropertyOptional } from 'src/shared'

export class GetProductsCategoriesParamsDto {
	@DtoPropertyOptional()
	parentKey: string
}
