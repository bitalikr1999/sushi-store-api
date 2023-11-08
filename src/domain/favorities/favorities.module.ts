import { DynamicModule, Module } from '@nestjs/common'
import { RedisModule, provideEntity } from 'src/libs'
import { FAVORITIES_REPOSITORY, FAVORITIES_SERVICE } from './typing/consts'
import { Favorite } from './entities'
import { provideClass } from 'src/shared'
import { FavoritiesService } from './services'

@Module({})
export class FavoritiesModule {
	private static getProviders() {
		return [
			provideEntity(FAVORITIES_REPOSITORY, Favorite),
			provideClass(FAVORITIES_SERVICE, FavoritiesService),
		]
	}

	private static getImports() {
		return [RedisModule.forFeature()]
	}

	static forRoot(): DynamicModule {
		return {
			module: FavoritiesModule,
			providers: this.getProviders(),
			imports: this.getImports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: FavoritiesModule,
			providers: this.getProviders(),
			exports: [FAVORITIES_REPOSITORY, FAVORITIES_SERVICE],
			imports: this.getImports(),
		}
	}
}
