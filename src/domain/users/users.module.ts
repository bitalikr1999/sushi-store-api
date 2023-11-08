import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { provideClass } from 'src/shared'
import {
	PASSWORD_HASH_SALT,
	USERS_BONUSES_HISTORY_RECORDS_REPOSITORY,
	USERS_REFERRAL_REPOSITORY,
	USERS_REFERRAL_SERVICE,
	USERS_REPOSITORY,
	USERS_SERVICE,
	USERS_SOCIALS_REPOSITORY,
} from './typing'
import { User, UserBonusesHistoryRecord, UserReferral, UserSocial } from './entities'
import { UsersModuleOptions } from './typing'
import { UsersService, USERS_SERVICES } from './services'
import { USERS_SEEDS } from './seeders'
import { UsersReferralsService } from './services/users-referrals.service'

@Module({})
export class UsersModule {
	static options: UsersModuleOptions

	static getProviders() {
		return [
			provideClass(USERS_SERVICE, UsersService),
			{
				provide: PASSWORD_HASH_SALT,
				useValue: UsersModule.options.passwordHashSalt,
			},
			provideEntity(USERS_REPOSITORY, User),
			provideEntity(USERS_SOCIALS_REPOSITORY, UserSocial),
			provideEntity(USERS_REFERRAL_REPOSITORY, UserReferral),
			provideEntity(USERS_BONUSES_HISTORY_RECORDS_REPOSITORY, UserBonusesHistoryRecord),
			provideClass(USERS_REFERRAL_SERVICE, UsersReferralsService),
			...USERS_SERVICES,
		]
	}

	static getExports() {
		return [USERS_SERVICE, USERS_REPOSITORY, USERS_REFERRAL_SERVICE]
	}

	static getImports() {
		return []
	}

	static forRoot(options: UsersModuleOptions): DynamicModule {
		UsersModule.options = options

		return {
			module: UsersModule,
			providers: [...UsersModule.getProviders(), ...USERS_SEEDS],
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: UsersModule,
			providers: UsersModule.getProviders(),
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}
}
