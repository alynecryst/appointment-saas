import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentBlockDocument = AppointmentBlock & Document;

@Schema({ timestamps: true })
export class AppointmentBlock {

  @Prop({ required: true })
  doctorId: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop()
  reason: string;

}

export const AppointmentBlockSchema = SchemaFactory.createForClass(AppointmentBlock);