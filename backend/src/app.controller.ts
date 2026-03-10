import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../src/common/decorators/current-user.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
