import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { ISessionsService, SESSIONS_SERVICE } from 'src/domain/sessions/typing'
import {
	IUsersRepository,
	IUsersService,
	USERS_REPOSITORY,
	USERS_SERVICE,
} from 'src/domain/users/typing'
import { IPagination, paginateAndGetMany, prepareSearchString } from 'src/shared'
import { Brackets } from 'typeorm'
import {
	AddBonusesPayloadDto,
	CreateUserPayloadDto,
	GetUsersListParamsDto,
	UpdateUserPayloadDto,
} from './dto'

@Injectable()
export class AdminUsersService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService
	@Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository
	@Inject(SESSIONS_SERVICE) private readonly sessionsService: ISessionsService

	public async getList(dto: GetUsersListParamsDto, pagination: IPagination, userId: number) {
		const query = this.usersRepository
			.createQueryBuilder('it')
			.orderBy('it.id', 'DESC')
			.where('it.id <> :userId', { userId })

		if (pagination.searchString) {
			query.andWhere(
				new Brackets(qb => {
					qb.where('it.firstName ILIKE :searchString', {
						searchString: prepareSearchString(pagination.searchString),
					})
					qb.orWhere('it.lastName ILIKE :searchString')
					qb.orWhere('it.login ILIKE :searchString')
				}),
			)
		}

		if (dto.status) {
			query.andWhere('it.status = :status', { status: dto.status })
		}

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')
		return { items, count }
	}

	public async create(dto: CreateUserPayloadDto) {
		const userId = await this.usersService.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			role: dto.role,
			password: dto.password,
		})
		const user = await this.usersRepository.findOne({ where: { id: userId } })
		return { user }
	}

	public async update(id: number, dto: UpdateUserPayloadDto) {
		const toUpdate = {
			firstName: _.defaultTo(dto.firstName, null),
			lastName: _.defaultTo(dto.lastName, null),
			email: _.defaultTo(dto.email, null),
			login: _.defaultTo(dto.login, null),
			role: _.defaultTo(dto.role, null),
		}
		await this.usersService.update(id, _.omitBy(toUpdate, _.isNil))
		const user = await this.usersRepository.findOne({ where: { id } })
		return { user }
	}
	public async forceDelete(userId: number) {
		await this.usersService.delete(userId)
	}

	public async getUserDetails(id: number) {
		const user = await this.usersRepository
			.createQueryBuilder('it')
			.where('it.id = :id', { id })
			.leftJoinAndSelect('it.bonusesHistory', 'bonusesHistory')
			.getOne()

		return user
	}

	public async addBonuses(authorId: number, targetUserId: number, dto: AddBonusesPayloadDto) {
		await this.usersService.addBonuses(targetUserId, {
			authorId,
			reason: dto.reason,
			bonuses: dto.bonuses,
		})
	}
}
