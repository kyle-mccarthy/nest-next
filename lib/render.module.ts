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
  /**
   * Registers this module with a Next app at the root of the Nest app.
   *
   * @param next The Next app to register.
   * @param options Options for the RenderModule.
   */
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

  /**
   * Register the RenderModule.
   *
   * @deprecated Use RenderModule.forRootAsync() when importing the module, and remove this post init call.
   * @param _app Previously, the Nest app. Now ignored.
   * @param next The Next app.
   * @param options Options for the RenderModule.
   */
  public register(
    _app: any,
    next: ReturnType<typeof Server>,
    options: Partial<RendererConfig> = {},
  ) {
    console.error(
      'RenderModule.register() is deprecated and will be removed in a future release.',
    );
    console.error(
      'Please use RenderModule.forRootAsync() when importing the module, and remove this post init call.',
    );

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
