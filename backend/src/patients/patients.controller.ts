import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Role } from '../auth/enums/role.enum';
import { Roles } from '../common/decorators/roles.decorator';

import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {

  constructor(
    private readonly patientsService: PatientsService
  ) { }

  @Roles(Role.ADMIN, Role.DOCTOR, Role.ASSISTANT)
  @Post()
  create(
    @Body() body: CreatePatientDto,
    @CurrentUser() user: any
  ) {
    return this.patientsService.create({
      ...body,
      tenantId: user.tenantId
    });
  }

  @Roles(Role.ADMIN, Role.DOCTOR, Role.ASSISTANT)
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.patientsService.findAll(
      user.tenantId
    );
  }

  @Roles(Role.ADMIN, Role.DOCTOR, Role.ASSISTANT)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.patientsService.findOne(
      id,
      user.tenantId
    );
  }

  @Roles(Role.ADMIN, Role.DOCTOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePatientDto,
    @CurrentUser() user: any
  ) {
    return this.patientsService.update(
      id,
      user.tenantId,
      body
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.patientsService.remove(
      id,
      user.tenantId
    );
  }

}