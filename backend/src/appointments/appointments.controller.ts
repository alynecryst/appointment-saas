import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {

  constructor(
    private readonly appointmentsService: AppointmentsService
  ) { }

  @Post()
  create(
    @Body() body: CreateAppointmentDto,
    @CurrentUser() user: any
  ) {

    return this.appointmentsService.create({
      ...body,
      tenantId: user.tenantId
    });

  }

  @Get('/doctor')
  getDoctorSchedule(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string,
    @CurrentUser() user: any
  ) {

    return this.appointmentsService.findDoctorSchedule(
      doctorId,
      date,
      user.tenantId
    );

  }

  @Get('/available')
  getAvailableSlots(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string,
    @CurrentUser() user: any
  ) {
    return this.appointmentsService.getAvailableSlots(
      doctorId,
      date,
      user.tenantId
    );
  }

  @Get('/doctor/week')
  getDoctorWeekSchedule(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string,
    @CurrentUser() user: any
  ) {
    return this.appointmentsService.getDoctorWeekSchedule(
      doctorId,
      date,
      user.tenantId
    );
  }

}