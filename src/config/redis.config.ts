import { IRedisModuleOptions } from 'src/libs/redis/interfaces'
import { getEnv } from 'src/shared'

export const getRedisConfig = (): IRedisModuleOptions => {
	return {
		port: Number(getEnv('REDIS_PORT')),
		host: getEnv('REDIS_HOST'),
		password: getEnv('REDIS_PASS'),
	}
}
