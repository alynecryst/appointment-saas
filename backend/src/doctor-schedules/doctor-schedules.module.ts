import { Module } from '@nestjs/common';
import { DoctorSchedulesController } from './doctor-schedules.controller';
import { DoctorSchedulesService } from './doctor-schedules.service';

import { MongooseModule } from '@nestjs/mongoose';

import {
  DoctorSchedule,
  DoctorScheduleSchema
} from './schemas/doctor-schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DoctorSchedule.name, schema: DoctorScheduleSchema }
    ])
  ],
  controllers: [DoctorSchedulesController],
  providers: [DoctorSchedulesService],
})
export class DoctorSchedulesModule { }