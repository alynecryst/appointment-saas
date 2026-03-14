import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {

  @Prop({ required: true })
  doctorId: string;

  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: 'scheduled' })
  status: string;

  @Prop()
  notes: string;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);


// 🚀 índice composto
AppointmentSchema.index({
  doctorId: 1,
  tenantId: 1,
  startTime: 1
});