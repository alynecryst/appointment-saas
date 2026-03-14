import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DoctorSchedule,
  DoctorScheduleDocument
} from './schemas/doctor-schedule.schema';

@Injectable()
export class DoctorSchedulesService {

  constructor(
    @InjectModel(DoctorSchedule.name)
    private scheduleModel: Model<DoctorScheduleDocument>,
  ) { }

  async create(data) {
    return this.scheduleModel.create(data);
  }

  async findDoctorSchedule(doctorId: string, tenantId: string) {

    return this.scheduleModel.find({
      doctorId,
      tenantId
    });

  }

}