import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  home() {
    return {};
  }

  @Get('/about/**')
  @Render('about/[...all]')
  @UseInterceptors(ParamsInterceptor)
  aboutAll() {
    return {};
  }

  @Get('/blog-posts')
  @Render('blog-posts')
  @UseInterceptors(ParamsInterceptor)
  blogPosts() {
    return { title: 'BLOG POSTS' };
  }

  @Get('/blog-posts/:slug')
  @Render('blog-posts/[slug]')
  @UseInterceptors(ParamsInterceptor)
  public blogPost() {
    return {};
  }

  @Get('/:id')
  @Render('[id]')
  @UseInterceptors(ParamsInterceptor)
  public post() {
    return {};
  }

  @Get('/api/health/ping')
  public ping() {
    return 'pong';
  }
}
