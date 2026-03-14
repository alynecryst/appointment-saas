import { IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {

  @IsString()
  doctorId: string;

  @IsNumber()
  dayOfWeek: number;

  @IsNumber()
  startHour: number;

  @IsNumber()
  endHour: number;

  @IsNumber()
  slotDuration: number;

}