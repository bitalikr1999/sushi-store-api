import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { FORM_REQUESTS_REPOSITORY, FORM_REQUESTS_SERVICE } from './typing'
import { FormRequest } from './entities'
import { provideClass } from 'src/shared'
import { FormRequestsService } from './services'

@Module({})
export class FormsModule {
	private static getProviders() {
		return [
			provideEntity(FORM_REQUESTS_REPOSITORY, FormRequest),
			provideClass(FORM_REQUESTS_SERVICE, FormRequestsService),
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: FormsModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: FormsModule,
			providers: this.getProviders(),
			exports: [FORM_REQUESTS_REPOSITORY, FORM_REQUESTS_SERVICE],
		}
	}
}
