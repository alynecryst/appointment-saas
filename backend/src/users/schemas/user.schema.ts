import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.DOCTOR
  })
  role: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);