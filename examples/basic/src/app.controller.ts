import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('Index')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }
}
