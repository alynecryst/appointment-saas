import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBlockDto {

  @IsString()
  doctorId: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsOptional()
  reason?: string;

}