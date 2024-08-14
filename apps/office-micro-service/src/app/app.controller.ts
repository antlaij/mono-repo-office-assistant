import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // GET http://localhost:8081/api/info
  @Get('info')
  info() {
    return this.appService.getOfficeJson();
  }

}
