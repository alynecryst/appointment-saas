import { Body, Controller, Post } from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AppointmentBlocksService } from './appointment-blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('appointment-blocks')
export class AppointmentBlocksController {

  constructor(
    private readonly blocksService: AppointmentBlocksService
  ) { }

  @Post()
  create(
    @Body() body: CreateBlockDto,
    @CurrentUser() user: any
  ) {

    return this.blocksService.create({
      ...body,
      tenantId: user.tenantId
    });

  }

}