import { DynamicModule, Module } from '@nestjs/common'
import { ScheduleModule } from 'src/domain/schedule/schedule.module'
import { RestAdminScheduleService } from './schedule.service'
import { AdminScheduleController } from './schedule.controller'

@Module({})
export class RestAdminScheduleModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminScheduleModule,
			imports: [ScheduleModule.forFeature()],
			providers: [RestAdminScheduleService],
			controllers: [AdminScheduleController],
		}
	}
}
