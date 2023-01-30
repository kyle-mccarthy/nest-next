import { Controller } from '@nestjs/common';
import { Page } from 'nest-next-spa/server';
import { AppService } from './AppService';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
  ) {}

  @Page('')
  public index() {
    const title = this.appService.getPageName();

    return {
      title,
    }
  }

  @Page('page')
  public page() {
    return {
      title: 'My Page',
    }
  }
}
