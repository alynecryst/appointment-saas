import { IsString } from 'class-validator';

export class AvailableSlotsDto {

  @IsString()
  doctorId: string;

  @IsString()
  date: string;

}