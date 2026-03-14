import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AppointmentBlock,
  AppointmentBlockDocument
} from './schemas/appointment-block.schema';

@Injectable()
export class AppointmentBlocksService {

  constructor(
    @InjectModel(AppointmentBlock.name)
    private blockModel: Model<AppointmentBlockDocument>,
  ) { }

  async create(data) {
    return this.blockModel.create(data);
  }

  async findBlocks(doctorId: string, start: Date, end: Date, tenantId: string) {

    return this.blockModel.find({
      doctorId,
      tenantId,
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

  }

}