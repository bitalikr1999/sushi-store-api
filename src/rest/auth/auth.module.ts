import { DynamicModule, Module } from '@nestjs/common'

import { AppAuthController, AppPasswordRecoveryController } from './controllers'
import { AppAuthService, AppPasswordRecoveryService } from './services'
import { UsersModule } from 'src/domain/users/users.module'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { JwtModule } from 'src/libs'
import { ConfirmationModule } from 'src/domain/confirmation/confirmation.module'

@Module({})
export class AuthModule {
	static forRoot(): DynamicModule {
		return {
			module: AuthModule,
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				JwtModule.forFeature(),
				ConfirmationModule.forFeature(),
			],
			providers: [AppAuthService, AppPasswordRecoveryService],
			controllers: [AppAuthController, AppPasswordRecoveryController],
		}
	}
}
