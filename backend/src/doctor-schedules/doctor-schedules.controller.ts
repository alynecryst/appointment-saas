import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('doctor-schedules')
export class DoctorSchedulesController {

  constructor(
    private readonly schedulesService: DoctorSchedulesService
  ) { }

  @Post()
  create(
    @Body() body: CreateScheduleDto,
    @CurrentUser() user: any
  ) {

    return this.schedulesService.create({
      ...body,
      tenantId: user.tenantId
    });

  }

  @Get()
  getSchedule(
    @Query('doctorId') doctorId: string,
    @CurrentUser() user: any
  ) {
    return this.schedulesService.findDoctorSchedule(
      doctorId,
      user.tenantId
    );
  }

}