import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class FindCitiesParamsDto {
	@DtoPropertyOptional()
	searchString: string
}
