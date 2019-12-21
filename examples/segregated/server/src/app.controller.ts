import { Controller, Get, Render } from '@nestjs/common';
import { AboutProps } from '../../dto/dist/AboutPage';
import { IndexProps } from '../../dto/dist/IndexPage';

@Controller()
export class AppController {
  @Render('index')
  @Get()
  public index(): IndexProps {
    return { message: 'from server' };
  }

  @Render('about')
  @Get('/about')
  public about(): AboutProps {
    return { message: 'server' };
  }
}
