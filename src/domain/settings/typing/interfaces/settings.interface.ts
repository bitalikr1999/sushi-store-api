import { SettingKey } from '../enums'

export interface ISettingRecord {
	id: number
	key: SettingKey
	value: string
}
