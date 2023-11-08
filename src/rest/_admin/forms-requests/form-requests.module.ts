import { DynamicModule, Module } from '@nestjs/common'
import { FormsModule } from 'src/domain/forms/forms.module'
import { RestAdminFormRequestsService } from './form-requests.service'
import { RestAdminFormRequestsController } from './form-requests.controller'

@Module({})
export class RestAdminFormRequestsModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminFormRequestsModule,
			imports: [FormsModule.forFeature()],
			providers: [RestAdminFormRequestsService],
			controllers: [RestAdminFormRequestsController],
		}
	}
}
