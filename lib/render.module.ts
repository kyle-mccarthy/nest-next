import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationConfig, HttpAdapterHost } from '@nestjs/core';
import Server from 'next';
import { RenderFilter } from './render.filter';
import { RenderService } from './render.service';
import { RendererConfig } from './types';

@Module({
  providers: [RenderService],
})
export class RenderModule {
  public static async forRootAsync(
    next: ReturnType<typeof Server>,
    options: Partial<RendererConfig> = {},
  ): Promise<DynamicModule> {
    if (typeof next.prepare === 'function') {
      await next.prepare();
    }

    return {
      exports: [RenderService],
      module: RenderModule,
      providers: [
        {
          inject: [HttpAdapterHost],
          provide: RenderService,
          useFactory: (nestHost: HttpAdapterHost): RenderService => {
            return RenderService.init(
              options,
              next.getRequestHandler(),
              next.render.bind(next),
              next.renderError.bind(next),
              nestHost.httpAdapter,
            );
          },
        },
        {
          inject: [ApplicationConfig, RenderService],
          provide: RenderFilter,
          useFactory: (
            nestConfig: ApplicationConfig,
            service: RenderService,
          ) => {
            const filter = new RenderFilter(service);
            nestConfig.addGlobalFilter(filter);

            return filter;
          },
        },
      ],
    };
  }

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly applicationConfig: ApplicationConfig,
    private readonly service: RenderService,
  ) {}

  public register(
    _app: any,
    next: ReturnType<typeof Server>,
    options: Partial<RendererConfig> = {},
  ) {
    if (!this.service.isInitialized()) {
      this.service.mergeConfig(options);
      this.service.setRequestHandler(next.getRequestHandler());
      this.service.setRenderer(next.render.bind(next));
      this.service.setErrorRenderer(next.renderError.bind(next));
      this.service.bindHttpServer(this.httpAdapterHost.httpAdapter);
      this.applicationConfig.useGlobalFilters(new RenderFilter(this.service));
    }
  }
}
