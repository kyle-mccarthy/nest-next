import { Controller } from '@nestjs/common';
import { Page } from 'nest-next-spa/server';

@Controller()
export class AppController {
  @Page('')
  public index() {
    return {
      title: 'Index Page',
    }
  }

  @Page('page')
  public page() {
    return {
      title: 'My Page',
    }
  }
}
