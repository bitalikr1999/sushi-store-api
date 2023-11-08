import { Currency, DtoProperty, DtoPropertyOptional } from 'src/shared'
import { ProductStatus } from '../enums'
import { IMedia } from 'src/domain/media/typing'
import { IProductTranslation } from '../interfaces'

export class ProductDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	price: number

	@DtoProperty()
	currency: Currency

	@DtoProperty()
	status: ProductStatus

	@DtoPropertyOptional()
	previewMediaId?: number

	@DtoPropertyOptional()
	categoriesIds?: number[]

	@DtoProperty()
	previewMedia?: IMedia

	@DtoProperty()
	translate?: IProductTranslation
}
