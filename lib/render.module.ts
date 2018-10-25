import { INestApplication, Module } from '@nestjs/common';
import { Server } from 'next';
import { RenderFilter } from './render.filter';
import { RenderMiddleware } from './render.middleware';
import { RenderService } from './render.service';

export interface RegisterOptions {
  viewsDir: null | string;
}

@Module({
  providers: [RenderService],
})
export class RenderModule {
  private app?: INestApplication;
  private server?: Server;

  constructor(private readonly service: RenderService) {}

  public register(
    app: INestApplication,
    server: Server,
    options: Partial<RegisterOptions> = {},
  ) {
    this.app = app;
    this.server = server;

    this.service.setRequestHandler(this.server.getRequestHandler());
    this.service.setRenderer(this.server.render.bind(this.server));
    this.service.setErrorRenderer(this.server.renderError.bind(this.server));
    this.service.bindHttpServer(this.app.getHttpAdapter());

    this.app.use(new RenderMiddleware(this.service).resolve());
    this.app.useGlobalFilters(
      new RenderFilter(
        this.service.getRequestHandler()!,
        this.service.getErrorRenderer()!,
      ),
    );

    if (options.viewsDir !== undefined) {
      this.service.setViewsDir(options.viewsDir);
    }
  }
}
