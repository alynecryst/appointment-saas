import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient {

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  birthDate: Date;

  @Prop()
  notes: string;

  @Prop({ required: true })
  tenantId: string;

}

export const PatientSchema = SchemaFactory.createForClass(Patient);