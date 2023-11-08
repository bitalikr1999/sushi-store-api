import { Inject, Injectable } from '@nestjs/common'
import {
	IAddFavoritePayload,
	IFavoritiesRepository,
	IFavoritiesService,
} from '../typing/interfaces'
import { FAVORITIES_REPOSITORY } from '../typing/consts'
import { RedisService } from 'src/libs'
import { noop } from 'lodash'

@Injectable()
export class FavoritiesService implements IFavoritiesService {
	@Inject(FAVORITIES_REPOSITORY)
	private readonly favoritiesRepository: IFavoritiesRepository

	constructor(private readonly redisService: RedisService) {}

	public async toggle(payload: IAddFavoritePayload) {
		this.redisService.del(payload.ownerId).catch(noop)
		const exist = await this.favoritiesRepository.findOneBy({
			ownerId: payload.ownerId,
			productId: payload.productId,
		})

		if (exist) {
			await this.favoritiesRepository.remove(exist)
			return false
		} else {
			await this.favoritiesRepository.insert({
				ownerId: payload.ownerId,
				productId: payload.productId,
			})
			return true
		}
	}

	public async getIds(ownerId: string): Promise<number[]> {
		const existInCache = await this.getFromCache(ownerId)
		if (existInCache) return existInCache
		return this.getIdsFromDb(ownerId)
	}

	private async getIdsFromDb(ownerId: string) {
		const records = await this.favoritiesRepository.find({
			where: {
				ownerId,
			},
			select: ['productId'],
		})
		const ids = records.map(it => it.productId)
		await this.setToCache(ownerId, ids)
		return ids
	}

	private async getFromCache(key: string) {
		const result = await this.redisService.get(key)
		if (result) return JSON.parse(result)
		return null
	}

	private async setToCache(key: string, ids: number[]) {
		await this.redisService.set(key, JSON.stringify(ids))
	}
}
