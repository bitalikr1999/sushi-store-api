import { DynamicModule, Module } from '@nestjs/common'
import { ScheduleModule } from 'src/domain/schedule/schedule.module'
import { RestApiScheduleService } from './schedule.service'
import { ApiScheduleController } from './schedule.controller'

@Module({})
export class RestApiScheduleModule {
	static forRoot(): DynamicModule {
		return {
			module: RestApiScheduleModule,
			imports: [ScheduleModule.forFeature()],
			providers: [RestApiScheduleService],
			controllers: [ApiScheduleController],
		}
	}
}
