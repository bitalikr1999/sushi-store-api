import { Type } from 'class-transformer'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreatePostTypeTranslationDto {
	@DtoProperty({ type: String, enum: Lang })
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description: string
}

export class CreatePostTypeDto {
	@DtoProperty()
	key?: string

	@DtoProperty({ isArray: true, type: CreatePostTypeTranslationDto })
	@Type(() => CreatePostTypeTranslationDto)
	translations?: CreatePostTypeTranslationDto[]
}

export class UpdatePostTypeDto {
	@DtoPropertyOptional()
	key?: string

	@DtoPropertyOptional({ isArray: true, type: CreatePostTypeTranslationDto })
	@Type(() => CreatePostTypeTranslationDto)
	translations?: CreatePostTypeTranslationDto[]
}
