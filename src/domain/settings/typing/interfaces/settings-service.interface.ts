import { SettingKey } from '../enums'

export interface ISettingsService {
	put(payload: IPutSettingRecordPayload): Promise<void>
	get(key: SettingKey): Promise<string>
}

export interface IPutSettingRecordPayload {
	key: SettingKey
	value: string
}
