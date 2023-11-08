import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { FindOptionsWhere } from 'typeorm'
import {
	CreateUserPayload,
	IAddBonusesPayload,
	IUseBonusesPayload,
	IUser,
	IUsersBonusesHistoryRecordsRepository,
	IUsersService,
	IUsersSocialsRepository,
	UpdateUserPayload,
	UserRole,
	USERS_BONUSES_HISTORY_RECORDS_REPOSITORY,
	USERS_REPOSITORY,
	USERS_SOCIALS_REPOSITORY,
	UserSocialType,
} from '../typing'
import { IUsersRepository } from '../typing'
import { UsersPasswordsService } from './users-passwords.service'
import * as randomstring from 'randomstring'
import { noop } from 'lodash'

@Injectable()
export class UsersService implements IUsersService {
	@Inject(USERS_REPOSITORY)
	private readonly usersRepository: IUsersRepository

	@Inject(USERS_SOCIALS_REPOSITORY)
	private readonly usersSocialRepository: IUsersSocialsRepository

	@Inject(USERS_BONUSES_HISTORY_RECORDS_REPOSITORY)
	private readonly usersBonusesHistoryRecordsRepository: IUsersBonusesHistoryRecordsRepository

	constructor(private readonly usersPasswordsService: UsersPasswordsService) {}

	public async create(payload: CreateUserPayload) {
		const existUser = await this.usersRepository.findOne({ where: { email: payload.email } })
		if (existUser) throw new ConflictException('Email is already used')

		const passwordSalt = this.usersPasswordsService.createUserSalt()

		const password = await this.usersPasswordsService.hashPassword(
			payload.password,
			passwordSalt,
		)

		const user = await this.usersRepository.save({
			...payload,
			password,
			passwordSalt,
			referalCode: randomstring.generate(8),
		})

		return user.id
	}

	public async changeFillProgress(
		userId: number,
		fieldsCount: number,
		completeFieldsCount: number,
	) {
		const progress: number = (completeFieldsCount / fieldsCount) * 100
		await this.usersRepository.update(userId, { progressFill: progress })
	}

	public async update(id: number, payload: UpdateUserPayload) {
		await this.usersRepository.update(id, {
			firstName: payload.firstName,
			lastName: payload.lastName,
		})
	}

	public async delete(id: number) {
		//TODO: implement delete user (delete from db or only set deleted status)
	}

	public async getOneByEmail(email: string) {
		return this.usersRepository.findOneBy({ email })
	}

	public async getOneBy(where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]) {
		return this.usersRepository.findOneBy(where)
	}

	public async compareUserPassword(userId: number, password: string) {
		return await this.usersPasswordsService.compareUserPasswords(userId, password)
	}

	public async changeUserPassword(userId: number, newPassword: string) {
		return await this.usersPasswordsService.changeUserPassword(userId, newPassword)
	}

	public async getSocialUser(
		id: string,
		type: UserSocialType,
		userData?: { email: string; name?: string; role?: UserRole },
	) {
		const existSocialRecord = await this.usersSocialRepository.findOne({
			where: { value: id, type },
		})

		let userId: number

		if (!existSocialRecord) {
			if (!userData) throw new NotFoundException()

			const existUser = await this.usersRepository.findOne({
				where: { email: userData.email },
			})
			if (existUser) userId = existUser.id
			else
				userId = await this.create({
					email: userData.email,

					role: userData.role,
					password: Math.random().toFixed(3),
				})

			await this.usersSocialRepository.insert({
				type,
				value: id,
				userId,
			})
		} else userId = existSocialRecord.userId

		return this.usersRepository.findOne({ where: { id: userId } })
	}

	public async useBonuses(userId: number, payload: IUseBonusesPayload): Promise<void> {
		const user = await this.usersRepository.findOneBy({ id: userId })
		if (Number(user.bonus) < Number(payload.bonuses)) throw new Error('Bonuses not enough')

		await this.usersRepository.update(user.id, {
			bonus: Number(user.bonus) - Number(payload.bonuses),
		})

		await this.usersBonusesHistoryRecordsRepository
			.insert({
				bonuses: Number(payload.bonuses),
				title: payload.reason,
				userId,
			})
			.catch(noop)
	}

	public async addBonuses(userId: number, payload: IAddBonusesPayload): Promise<void> {
		const user = await this.usersRepository.findOneBy({ id: userId })

		await this.usersRepository.update(user.id, {
			bonus: Number(user.bonus) + Number(payload.bonuses),
		})
		await this.usersBonusesHistoryRecordsRepository
			.insert({
				bonuses: Number(payload.bonuses),
				title: payload.reason,
				userId,
				authorId: payload.authorId,
			})
			.catch(noop)
	}
}
