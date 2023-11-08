import { DynamicModule, Module } from '@nestjs/common'

import { AuthController } from './controllers'
import { AuthService } from './services'
import { UsersModule } from 'src/domain/users/users.module'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { ConfirmationModule } from 'src/domain/confirmation/confirmation.module'

@Module({})
export class PublickAuthModule {
	static forRoot(): DynamicModule {
		return {
			module: PublickAuthModule,
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				ConfirmationModule.forFeature(),
			],
			providers: [AuthService],
			controllers: [AuthController],
		}
	}
}
