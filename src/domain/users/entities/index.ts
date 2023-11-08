import { UserBonusesHistoryRecord } from './user-bonuses-history-record.entity'
import { UserReferral } from './user-referral.entity'
import { UserSocial } from './user-social.entity'
import { User } from './user.entity'

export const USERS_ENTITIES = [User, UserSocial, UserReferral, UserBonusesHistoryRecord]

export { User, UserSocial, UserReferral, UserBonusesHistoryRecord }
