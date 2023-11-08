import { Inject, Injectable } from '@nestjs/common'
import {
	IPutSettingRecordPayload,
	ISettingRecord,
	ISettingsRepository,
	ISettingsService,
} from '../typing/interfaces'
import { SETTINGS_REPOSITORY } from '../typing/consts'
import { RedisService } from 'src/libs'
import { SettingKey } from '../typing/enums'

@Injectable()
export class SettingsService implements ISettingsService {
	@Inject(SETTINGS_REPOSITORY)
	private readonly settingsRepository: ISettingsRepository

	constructor(private readonly redisService: RedisService) {}

	public async put(payload: IPutSettingRecordPayload): Promise<void> {
		if (!payload.value) return null
		const exist = await this.settingsRepository.findOneBy({
			key: payload.key,
		})

		if (exist) {
			await this.settingsRepository.update(exist.id, { value: payload.value })
		} else {
			await this.settingsRepository.insert({
				key: payload.key,
				value: payload.value,
			})
		}

		await this.redisService.set(`setting_${payload.key}`, payload.value)
	}

	public async get(key: SettingKey): Promise<string> {
		const fromCache = await this.redisService.get(`setting_${key}`)
		if (fromCache) return fromCache

		const data = await this.settingsRepository.findOneBy({ key })
		if (!data) return null

		await this.redisService.set(`setting_${data.key}`, data.value)
		return data.value
	}
}
