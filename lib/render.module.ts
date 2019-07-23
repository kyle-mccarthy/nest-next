import { INestApplication, Inject, Module } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import  Server from 'next-server';
import { RenderFilter } from './render.filter';
import { RenderService } from './render.service';
import { RendererConfig } from './types';

type INestAppliactionSubset = Pick<INestApplication, 'getHttpAdapter' | 'useGlobalFilters'> & Partial<INestApplication>;
@Module({
  providers: [RenderService],
})
export class RenderModule {
  private app?: INestAppliactionSubset;
  private server?: ReturnType<typeof Server>;

  constructor(private readonly service: RenderService) {}

  public register(
    app: INestAppliactionSubset,
    server: ReturnType<typeof Server>,
    options: Partial<RendererConfig> = {},
  ) {
    this.app = app;
    this.server = server;

    this.service.mergeConfig(options);
    this.service.setRequestHandler(this.server.getRequestHandler());
    this.service.setRenderer(this.server.render.bind(this.server));
    this.service.setErrorRenderer(this.server.renderError.bind(this.server));
    this.service.bindHttpServer(this.app.getHttpAdapter());

    if (typeof options.useErrorHandler === 'undefined' || options.useErrorHandler) {
      this.app.useGlobalFilters(new RenderFilter(this.service));
    }
  }
}
