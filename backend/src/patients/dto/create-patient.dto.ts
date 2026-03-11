import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  birthDate?: Date;

  @IsOptional()
  notes?: string;

}