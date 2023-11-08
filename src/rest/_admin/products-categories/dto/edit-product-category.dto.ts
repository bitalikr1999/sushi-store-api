import { Type } from 'class-transformer'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreateProductCategoryTranslationDto {
	@DtoProperty()
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description?: string
}

export class CreateProductCategoryPayloadDto {
	@DtoPropertyOptional()
	key?: string

	@DtoPropertyOptional()
	data?: any

	@DtoPropertyOptional()
	parentId?: number

	@DtoProperty({ isArray: true, type: CreateProductCategoryTranslationDto })
	@Type(() => CreateProductCategoryTranslationDto)
	translations: CreateProductCategoryTranslationDto[]
}

export class UpdateProductCategoryPayloadDto {
	@DtoPropertyOptional()
	key?: string

	@DtoPropertyOptional()
	data?: any

	@DtoPropertyOptional()
	parentId?: number

	@DtoPropertyOptional({ isArray: true, type: CreateProductCategoryTranslationDto })
	@Type(() => CreateProductCategoryTranslationDto)
	translations?: CreateProductCategoryTranslationDto[]
}
