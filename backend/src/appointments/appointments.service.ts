import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Appointment,
  AppointmentDocument
} from './schemas/appointment.schema';

import {
  DoctorSchedule,
  DoctorScheduleDocument
} from '../doctor-schedules/schemas/doctor-schedule.schema';

import {
  AppointmentBlock,
  AppointmentBlockDocument
} from '../appointment-blocks/schemas/appointment-block.schema';

import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(DoctorSchedule.name)
    private doctorScheduleModel: Model<DoctorScheduleDocument>,
    @InjectModel(AppointmentBlock.name)
    private blockModel: Model<AppointmentBlockDocument>,
  ) { }

  async create(data: CreateAppointmentDto & { tenantId: string }) {

    const conflict = await this.appointmentModel.findOne({
      doctorId: data.doctorId,
      tenantId: data.tenantId,
      startTime: { $lt: data.endTime },
      endTime: { $gt: data.startTime },
    });

    if (conflict) {
      throw new BadRequestException(
        'Doctor already has an appointment at this time'
      );
    }

    return this.appointmentModel.create(data);
  }

  async findDoctorSchedule(doctorId: string, date: string, tenantId: string) {

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.appointmentModel.find({
      doctorId,
      tenantId,
      startTime: { $gte: start, $lte: end }
    });

  }

  async getAvailableSlots(
    doctorId: string,
    date: string,
    tenantId: string
  ) {

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    const schedule = await this.doctorScheduleModel.findOne({
      doctorId,
      tenantId,
      dayOfWeek
    });

    if (!schedule) {
      return [];
    }


    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(selectedDate);
    endDay.setHours(23, 59, 59, 999);

    const blocks = await this.blockModel.find({
      doctorId,
      tenantId,
      startTime: { $gte: startDay, $lte: endDay }
    });

    const appointments = await this.appointmentModel.find({
      doctorId,
      tenantId,
      startTime: { $gte: startDay, $lte: endDay }
    });

    const slots: string[] = [];

    const current = new Date(selectedDate);
    current.setHours(schedule.startHour, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(schedule.endHour, 0, 0, 0);

    while (current < end) {

      const slotStart = new Date(current);
      const slotEnd = new Date(
        current.getTime() + schedule.slotDuration * 60000
      );

      const conflict = appointments.some(a => {

        return (
          slotStart < a.endTime &&
          slotEnd > a.startTime
        );

      });

      const blockConflict = blocks.some(b => {
        return (
          slotStart < b.endTime &&
          slotEnd > b.startTime
        );
      });

      if (!conflict && !blockConflict) {
        slots.push(slotStart.toISOString());
      }

      current.setMinutes(
        current.getMinutes() + schedule.slotDuration
      );

    }

    return slots;

  }

  async getDoctorWeekSchedule(
    doctorId: string,
    date: string,
    tenantId: string
  ) {

    const baseDate = new Date(date);

    const day = baseDate.getDay();

    const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1);

    const monday = new Date(baseDate.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const appointments = await this.appointmentModel.find({
      doctorId,
      tenantId,
      startTime: { $gte: monday, $lte: sunday }
    });

    return appointments;
  }
}