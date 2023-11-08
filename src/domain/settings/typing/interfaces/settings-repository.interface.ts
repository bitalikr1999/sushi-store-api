import { Repository } from 'typeorm'
import { ISettingRecord } from './settings.interface'

export type ISettingsRepository = Repository<ISettingRecord>
