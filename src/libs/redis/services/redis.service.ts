import { Inject, Injectable } from '@nestjs/common'

import { REDIS_OPTIONS } from '../consts'
import { IRedisModuleOptions } from '../interfaces'

import Redis from 'ioredis'

@Injectable()
export class RedisService {
	private client: Redis

	constructor(@Inject(REDIS_OPTIONS) options: IRedisModuleOptions) {
		this.client = new Redis(options)
	}

	async set(key: any, value: any, lifeTime?: number) {
		if (lifeTime) await this.client.set(key, value, 'ex' as any, lifeTime)
		else await this.client.set(key, value)
	}

	async get(key: any) {
		return await this.client.get(key)
	}

	async del(key: any) {
		await this.client.del(key)
	}
}
