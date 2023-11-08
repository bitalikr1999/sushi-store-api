import { IMailerModuleOptions } from 'src/libs/mailer/typing'
import { getEnv, stringToBoolean } from 'src/shared'

export const getMailerConfig = (): IMailerModuleOptions => {
	return {
		domain: getEnv('MAILER_DOMAIN', true),
		port: Number(getEnv('MAILER_PORT', true)),
		password: getEnv('MAILER_PASSWORD', true),
		login: getEnv('MAILER_LOGIN', true),
		protocol: getEnv('MAILER_PROTOCOL', true),
		test: stringToBoolean(getEnv('MAILER_TEST_MODE')),
		secure: stringToBoolean(getEnv('MAILER_SECURE', true)),
	}
}
