import { UserRole, UserSocialType, UserStatus } from '../enums'

export interface IUser {
	id: number
	role: UserRole
	status: UserStatus
	email: string

	firstName: string
	lastName: string
	password: string
	passwordSalt: string
	progressFill?: number
	bonus?: number
	referalCode: string
	createdAt: string
	updatedAt: string

	bonusesHistory: IUserBonusesHistoryRecord[]
}

export interface IUserShortInfo {
	userId: number
	role?: UserRole
	name?: string
	avatarUrl?: string
}

export interface IUserSocial {
	id: number
	type: UserSocialType
	value: string
	userId: number
}

export interface IUserReferral {
	id: number
	userId: number
	invitedId: number

	isBonusesAccured: boolean
	bonusesToAccured: number
}

export interface IUserBonusesHistoryRecord {
	id: number

	bonuses: number

	title: string
	createdAt: string
	userId: number

	authorId?: number
}
