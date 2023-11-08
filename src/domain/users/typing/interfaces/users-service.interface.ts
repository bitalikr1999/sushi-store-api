import { FindOptionsWhere } from 'typeorm'
import { UserRole, UserSocialType } from '../enums'
import { IUser } from './user.interface'

export interface CreateUserPayload {
	role: UserRole
	email: string
	password: string
	firstName?: string
	lastName?: string
	bonus?: number
}

export interface UpdateUserPayload {
	firstName?: string
	lastName?: string
}

export interface IUsersService {
	create(payload: CreateUserPayload): Promise<number>
	update(id: number, payload: UpdateUserPayload): Promise<void>
	delete(id: number): Promise<void>
	getOneByEmail(email: string): Promise<IUser>
	compareUserPassword(userId: number, password: string): Promise<boolean>
	getOneBy(where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]): Promise<IUser>
	changeUserPassword(userId: number, newPassword: string): Promise<void>
	changeFillProgress(
		userId: number,
		fieldsCount: number,
		completeFieldsCount: number,
	): Promise<void>
	getSocialUser(
		id: string,
		type: UserSocialType,
		userData: { email: string; name?: string; role?: UserRole },
	): Promise<IUser>
	useBonuses(userId: number, payload: IUseBonusesPayload): Promise<void>
	addBonuses(userId: number, payload: IAddBonusesPayload): Promise<void>
}

export interface IUseBonusesPayload {
	bonuses: number
	reason: string
}

export interface IAddBonusesPayload {
	bonuses: number
	reason: string

	authorId?: number
}
