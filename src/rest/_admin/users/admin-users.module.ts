import { DynamicModule, Module } from '@nestjs/common'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { UsersModule } from 'src/domain/users/users.module'
import { AdminUsersController } from './admin-users.controller'
import { AdminUsersService } from './admin-users.service'

@Module({})
export class RestAdminUsersModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminUsersModule,
			imports: [UsersModule.forFeature(), SessionsModule.forFeature()],
			controllers: [AdminUsersController],
			providers: [AdminUsersService],
		}
	}
}
