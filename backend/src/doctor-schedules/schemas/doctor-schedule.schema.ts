import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorScheduleDocument = DoctorSchedule & Document;

@Schema({ timestamps: true })
export class DoctorSchedule {

  @Prop({ required: true })
  doctorId: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  dayOfWeek: number;
  // 0 = domingo
  // 1 = segunda
  // 2 = terça
  // etc

  @Prop({ required: true })
  startHour: number;

  @Prop({ required: true })
  endHour: number;

  @Prop({ default: 30 })
  slotDuration: number;

}

export const DoctorScheduleSchema = SchemaFactory.createForClass(DoctorSchedule);