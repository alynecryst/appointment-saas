import { Module } from '@nestjs/common';
import { AppointmentBlocksController } from './appointment-blocks.controller';
import { AppointmentBlocksService } from './appointment-blocks.service';

import { MongooseModule } from '@nestjs/mongoose';

import {
  AppointmentBlock,
  AppointmentBlockSchema
} from './schemas/appointment-block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppointmentBlock.name, schema: AppointmentBlockSchema }
    ])
  ],
  controllers: [AppointmentBlocksController],
  providers: [AppointmentBlocksService],
})
export class AppointmentBlocksModule { }