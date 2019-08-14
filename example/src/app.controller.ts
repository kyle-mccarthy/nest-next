import {
  CacheInterceptor,
  Controller,
  Get,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessageContainer } from './types.shared';

@Controller('/')
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api')
  public rootFetch(): MessageContainer {
    return this.appService.root();
  }

  @Get()
  @Render('index')
  public root(): MessageContainer {
    return this.appService.root();
  }

  @Get('api/about')
  public aboutFetch(): MessageContainer {
    return this.appService.root();
  }

  @Get('about')
  @Render('about')
  public about(): MessageContainer {
    return this.appService.root();
  }
}
