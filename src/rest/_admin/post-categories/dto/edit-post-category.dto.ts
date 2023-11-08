import { Type } from 'class-transformer'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreatePostCategoryTranslationDto {
	@DtoProperty({ type: String, enum: Lang })
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description: string
}

export class CreatePostCategoryDto {
	@DtoProperty()
	key?: string

	@DtoPropertyOptional()
	parentId?: number

	@DtoProperty({ isArray: true, type: CreatePostCategoryTranslationDto })
	@Type(() => CreatePostCategoryTranslationDto)
	translations?: CreatePostCategoryTranslationDto[]
}

export class UpdatePostCategoryDto {
	@DtoPropertyOptional()
	key?: string

	@DtoPropertyOptional({ isArray: true, type: CreatePostCategoryTranslationDto })
	@Type(() => CreatePostCategoryTranslationDto)
	translations?: CreatePostCategoryTranslationDto[]
}


export class AdminPostCategoryDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	key?: string

	@DtoProperty({ isArray: true, type: CreatePostCategoryTranslationDto })
	@Type(() => CreatePostCategoryTranslationDto)
	translations?: CreatePostCategoryTranslationDto[]

	@DtoProperty({ isArray: true, type: AdminPostCategoryDto })
	@Type(() => AdminPostCategoryDto)
	childrens?: AdminPostCategoryDto[]
}
