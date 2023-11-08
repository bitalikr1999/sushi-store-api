import { PageTemplate } from 'src/config/templates'
import { DtoProperty } from 'src/shared'

export class GetTemplateParamsDto {
	@DtoProperty()
	template: PageTemplate | string
}
