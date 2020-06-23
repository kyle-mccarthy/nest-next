import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/data')
  public index() {
    return { message: 'Data from AppController' };
  }
}
