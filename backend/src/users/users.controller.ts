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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../common/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

import { Role } from '../auth/enums/role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Serialize(UserResponseDto)
  @Post()
  @Roles(Role.ADMIN, Role.ASSISTANT)
  create(
    @Body() body: CreateUserDto,
    @CurrentUser() user: any
  ) {
    return this.usersService.create({
      ...body,
      tenantId: user.tenantId
    });
  }

  @Get()
  @Serialize(UserResponseDto)
  findAll(@CurrentUser() user: any) {
    return this.usersService.findAll(user.tenantId);
  }

  @Get(':id')
  @Serialize(UserResponseDto)
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.usersService.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @Serialize(UserResponseDto)
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: UpdateUserDto
  ) {
    return this.usersService.update(
      id,
      user.tenantId,
      body
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @Serialize(UserResponseDto)
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.usersService.remove(
      id,
      user.tenantId
    );
  }
}