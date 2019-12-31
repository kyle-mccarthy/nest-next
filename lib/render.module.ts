import { DynamicModule } from '@nestjs/common';
import { ApplicationConfig, HttpAdapterHost } from '@nestjs/core';
import Server from 'next';
import { RenderFilter } from './render.filter';
import { RenderService } from './render.service';
import { RendererConfig } from './types';

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
            return new RenderService(
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
}
