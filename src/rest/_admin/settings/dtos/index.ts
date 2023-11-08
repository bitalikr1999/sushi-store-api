import { SettingKey } from 'src/domain/settings/typing/enums'
import { DtoProperty } from 'src/shared'

export class PutSettingsPayloadDto {
	@DtoProperty()
	key: SettingKey

	@DtoProperty()
	value: string
}

export class PutSettingsDto {
	@DtoProperty({
		type: PutSettingsPayloadDto,
		isArray: true,
	})
	records: PutSettingsPayloadDto[]
}

export class GetSettingsParamsDto {
	@DtoProperty()
	keys: string
}
