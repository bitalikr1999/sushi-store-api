import { Inject, Injectable } from '@nestjs/common'
import { SETTINGS_SERVICE } from 'src/domain/settings/typing/consts'
import { ISettingsService } from 'src/domain/settings/typing/interfaces'
import { GetSettingsParamsDto, PutSettingsDto, PutSettingsPayloadDto } from './dtos'
import { SettingKey } from 'src/domain/settings/typing/enums'

@Injectable()
export class RestAdminSettingsService {
	@Inject(SETTINGS_SERVICE)
	private readonly settingsService: ISettingsService

	public async put(dto: PutSettingsPayloadDto) {
		await this.settingsService.put(dto)
	}

	public async putMany(dto: PutSettingsDto) {
		for await (const item of dto.records) {
			await this.settingsService.put(item)
		}
	}

	public async get(dto: GetSettingsParamsDto) {
		const keys = dto.keys.split(',')

		const result: Partial<Record<SettingKey, string>> = {}

		await Promise.all(
			keys.map(async it => {
				result[it] = await this.settingsService.get(it as any)
			}),
		)

		return result
	}
}
