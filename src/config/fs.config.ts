import { IFilesStorageOptions } from 'src/libs/file-storage/interfaces'
import { getEnv } from 'src/shared'

export const getFilesStorageConfig = (): IFilesStorageOptions => {
	return {
		host: getEnv('MINIO_HOST'),
		port: Number(getEnv('MINIO_PORT')),
		accessKey: getEnv('MINIO_ACCESS_KEY'),
		secretKey: getEnv('MINIO_SECRET_KEY'),
		urlPrefix: getEnv('MINIO_URL_PREFIX'),
		bucket: getEnv('MINIO_BUCKET') || 'files',
		privateBucket: getEnv('MINIO_PRIVATE_BUCKET'),
	}
}
