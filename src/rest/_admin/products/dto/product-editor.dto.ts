import { Type } from 'class-transformer'
import { ProductStatus } from 'src/domain/products/typing/enums'
import { Currency, DtoProperty, DtoPropertyOptional, Lang } from 'src/shared'

export class CreateProductTranslationDto {
	@DtoProperty()
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description?: string
}

export class CreateProductVariantPayloadDto {
	@DtoProperty()
	id?: number

	@DtoPropertyOptional()
	previewMediaId?: number

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	description?: string
}

export class CreateProductPayloadDto {
	@DtoProperty()
	price: number

	@DtoProperty()
	code: string

	@DtoPropertyOptional()
	countInStock?: number

	@DtoProperty()
	currency: Currency

	@DtoProperty()
	discount: number

	@DtoProperty()
	status: ProductStatus

	@DtoPropertyOptional()
	previewMediaId?: number

	@DtoProperty()
	categoriesIds?: number[]

	@DtoProperty({ isArray: true, type: CreateProductTranslationDto })
	@Type(() => CreateProductTranslationDto)
	translations: CreateProductTranslationDto[]

	@DtoPropertyOptional({ isArray: true, type: CreateProductVariantPayloadDto })
	@Type(() => CreateProductVariantPayloadDto)
	variants?: CreateProductVariantPayloadDto[]
}

export class UpdateProductPayloadDto {
	@DtoPropertyOptional()
	countInStock?: number

	@DtoPropertyOptional()
	price?: number

	@DtoPropertyOptional()
	code?: string

	@DtoPropertyOptional()
	currency?: Currency

	@DtoPropertyOptional()
	discount?: number

	@DtoPropertyOptional()
	previewMediaId?: number

	@DtoPropertyOptional()
	categoriesIds?: number[]

	@DtoPropertyOptional({ isArray: true, type: CreateProductTranslationDto })
	@Type(() => CreateProductTranslationDto)
	translations?: CreateProductTranslationDto[]

	@DtoProperty({ isArray: true, type: CreateProductVariantPayloadDto })
	@Type(() => CreateProductVariantPayloadDto)
	variants?: CreateProductVariantPayloadDto[]
}
