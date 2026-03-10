import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('patients')
export class PatientsController {

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'This action returns all patients';
  }
}
