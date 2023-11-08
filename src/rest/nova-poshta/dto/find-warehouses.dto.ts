import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class FindWarehousesParamsDto {
	@DtoPropertyOptional()
	cityRef: string

	@DtoPropertyOptional()
	searchString: string
}
