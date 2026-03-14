import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

import { MongooseModule } from '@nestjs/mongoose';

import {
  Appointment,
  AppointmentSchema
} from './schemas/appointment.schema';

import {
  DoctorSchedule,
  DoctorScheduleSchema
} from '../doctor-schedules/schemas/doctor-schedule.schema';

import {
  AppointmentBlock,
  AppointmentBlockSchema
} from '../appointment-blocks/schemas/appointment-block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: DoctorSchedule.name, schema: DoctorScheduleSchema },
      { name: AppointmentBlock.name, schema: AppointmentBlockSchema },
    ])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule { }