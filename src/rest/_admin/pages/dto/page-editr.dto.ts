import { PageTemplate } from 'src/config/templates'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreatePageTranslationPayloadDto {
	@DtoProperty()
	title: string

	@DtoProperty()
	description: string

	@DtoProperty()
	lang: Lang
}
export class CreatePagePayloadDto {
	@DtoProperty({ enum: PageTemplate })
	template: PageTemplate

	@DtoProperty()
	key: string

	@DtoPropertyOptional()
	metadata?: any

	@DtoProperty({ type: CreatePageTranslationPayloadDto, isArray: true })
	translations: CreatePageTranslationPayloadDto[]
}

export class UpdatePagePayloadDto {
	@DtoPropertyOptional()
	template: PageTemplate

	@DtoPropertyOptional()
	key: string

	@DtoPropertyOptional()
	metadata?: any

	@DtoProperty({ type: CreatePageTranslationPayloadDto, isArray: true })
	translations: CreatePageTranslationPayloadDto[]
}
