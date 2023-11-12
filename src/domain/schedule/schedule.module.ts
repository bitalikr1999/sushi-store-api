import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { SCHEDULE_SERVICE, SCHEDULE_SHIFTS_REPOSITORY } from './typing/consts'
import { ScheduleShift } from './entites'
import { provideClass } from 'src/shared'
import { ScheduleService } from './services'

@Module({})
export class ScheduleModule {
	static forRoot(): DynamicModule {
		return {
			module: ScheduleModule,
			imports: [],
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ScheduleModule,
			providers: [
				provideEntity(SCHEDULE_SHIFTS_REPOSITORY, ScheduleShift),
				provideClass(SCHEDULE_SERVICE, ScheduleService),
			],
			exports: [SCHEDULE_SHIFTS_REPOSITORY, SCHEDULE_SERVICE],
		}
	}
}
