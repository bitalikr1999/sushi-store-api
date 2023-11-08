import { DynamicModule, Module } from '@nestjs/common'
import { FormsModule } from 'src/domain/forms/forms.module'
import { RestFormsRequestsService } from './forms-requests.service'
import { RestPublicFormsRequestsController } from './forms-requests.controller'

@Module({})
export class RestPublicFormRequestsModule {
	static forRoot(): DynamicModule {
		return {
			module: RestPublicFormRequestsModule,
			imports: [FormsModule.forFeature()],
			providers: [RestFormsRequestsService],
			controllers: [RestPublicFormsRequestsController],
		}
	}
}
