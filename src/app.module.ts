import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import { getDatabaseConfig, getFilesStorageConfig, getJwtConfig, getRedisConfig } from './config'
import { DatabaseModule } from './libs/database'
import { FilesStorageModule, JwtModule, NovaPoshtaModule, RedisModule } from './libs'
import { DOMAIN_MODULES } from './domain'

import { UserMiddleware } from './domain/sessions/middlewares'
import { getNovaPoshtaConfig } from './config/nova-poshta.config'
import { MailerModule } from './libs/mailer/mailer.module'
import { getMailerConfig } from './config/mailer.config'
import { REST_MODULES } from './rest'

@Module({
	imports: [
		JwtModule.forRoot(getJwtConfig()),
		DatabaseModule.forRoot(...getDatabaseConfig()),
		FilesStorageModule.forRoot(getFilesStorageConfig()),
		RedisModule.forRoot(getRedisConfig()),
		NovaPoshtaModule.forRoot(getNovaPoshtaConfig()),
		MailerModule.forRoot(getMailerConfig()),
		...DOMAIN_MODULES(),
		...REST_MODULES(),
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
