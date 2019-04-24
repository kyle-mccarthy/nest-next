import { INestApplication, Module } from '@nestjs/common';
import { Server } from 'next';
import { RenderFilter } from './render.filter';
import { RenderService } from './render.service';
import { RendererConfig } from './types';

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
    options: Partial<RendererConfig> = {},
  ) {
    this.app = app;
    this.server = server;

    this.service.mergeConfig(options);
    this.service.setRequestHandler(this.server.getRequestHandler());
    this.service.setRenderer(this.server.render.bind(this.server));
    this.service.setErrorRenderer(this.server.renderError.bind(this.server));
    this.service.bindHttpServer(this.app.getHttpAdapter());

    this.app.useGlobalFilters(new RenderFilter(this.service));
  }
}
