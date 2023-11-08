import { Repository } from 'typeorm'
import { IUser, IUserBonusesHistoryRecord, IUserReferral, IUserSocial } from './user.interface'

export type IUsersRepository = Repository<IUser>
export type IUsersSocialsRepository = Repository<IUserSocial>
export type IUsersReferralsRepository = Repository<IUserReferral>
export type IUsersBonusesHistoryRecordsRepository = Repository<IUserBonusesHistoryRecord>
