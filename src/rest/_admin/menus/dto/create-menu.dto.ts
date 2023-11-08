import { Type } from 'class-transformer'
import { MenuLocations, MenuParent } from 'src/domain/menu/typing'
import { DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreateMenuItemTranslatesDto {
	@DtoProperty()
	name: string

	@DtoProperty({ type: String, enum: Lang })
	lang: Lang
}

export class CreateMenuDto {
	@DtoProperty()
	key: string

	@DtoProperty()
	name: string

	@DtoPropertyOptional({ type: String, enum: MenuLocations, default: MenuLocations.Primary })
	locations?: MenuLocations
}

export class CreateMenuItemDto {
	@DtoProperty()
	key: string

	@DtoProperty()
	parentId: number

	@DtoProperty()
	order?: number

	@DtoProperty({ type: String, enum: MenuParent })
	parentColumn: MenuParent

	@DtoProperty()
	url: string

	@DtoProperty({ isArray: true, type: CreateMenuItemTranslatesDto })
	@Type(() => CreateMenuItemTranslatesDto)
	translates: CreateMenuItemTranslatesDto[]
}

export class EditMenuItemDto {
	@DtoPropertyOptional()
	key: string

	@DtoPropertyOptional()
	parentId: number

	@DtoPropertyOptional()
	order?: number

	@DtoPropertyOptional({ type: String, enum: MenuParent })
	parentColumn: MenuParent

	@DtoPropertyOptional()
	url: string

	@DtoPropertyOptional({ isArray: true, type: CreateMenuItemTranslatesDto })
	@Type(() => CreateMenuItemTranslatesDto)
	translates: CreateMenuItemTranslatesDto[]
}
