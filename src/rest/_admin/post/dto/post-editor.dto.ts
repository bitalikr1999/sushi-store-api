import { Type } from 'class-transformer'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreatePostTranslationDto {
	@DtoProperty({ type: String, enum: Lang })
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description?: string
}

export class ICreatePostDto {
	@DtoProperty()
	typeId?: number

	@DtoProperty()
	categoiesId?: number[]

	@DtoProperty({ isArray: true, type: CreatePostTranslationDto })
	@Type(() => CreatePostTranslationDto)
	translations?: CreatePostTranslationDto[]
}

export class IUpdatePostDto {
	@DtoPropertyOptional()
	authorId?: number

	@DtoPropertyOptional()
	typeId?: number

	@DtoPropertyOptional()
	categoiesId?: number[]

	@DtoPropertyOptional({ isArray: true, type: CreatePostTranslationDto })
	@Type(() => CreatePostTranslationDto)
	translations?: CreatePostTranslationDto[]
}

export class IGetPostListDto {
	@DtoPropertyOptional()
	typeId?: string
}
