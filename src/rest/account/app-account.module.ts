import { DynamicModule, Module } from '@nestjs/common'

import { AppAccountController } from './app-account.controller'
import { AppAccountService } from './app-account.service'
import { JwtModule } from 'src/libs'
import { UsersModule } from 'src/domain/users/users.module'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
@Module({})
export class AccountModule {
	static forRoot(): DynamicModule {
		return {
			module: AccountModule,
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				JwtModule.forFeature(),
			],
			controllers: [AppAccountController],
			providers: [AppAccountService],
		}
	}
}
