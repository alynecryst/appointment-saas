import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {

  @IsString()
  doctorId: string;

  @IsString()
  patientId: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsOptional()
  notes?: string;

}