import { Type } from 'class-transformer'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

class TranslateDto {
	@DtoProperty()
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description?: string
}

export class AdminProductCategoryDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	key?: string

	@DtoProperty({ isArray: true, type: TranslateDto })
	@Type(() => TranslateDto)
	translations?: TranslateDto[]

	@DtoProperty({ isArray: true, type: AdminProductCategoryDto })
	@Type(() => AdminProductCategoryDto)
	childrens?: AdminProductCategoryDto[]
}
