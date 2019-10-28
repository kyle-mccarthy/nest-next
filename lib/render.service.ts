import {
  HttpServer,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ParsedUrlQuery } from 'querystring';
import { isInternalUrl } from './next-utils';
import {
  ErrorHandler,
  ErrorRenderer,
  RenderableResponse,
  Renderer,
  RendererConfig,
  RequestHandler,
} from './types';

@Injectable()
export class RenderService {
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private errorRenderer?: ErrorRenderer;
  private errorHandler?: ErrorHandler;
  private config: RendererConfig = {
    dev: process.env.NODE_ENV !== 'production',
    viewsDir: '/views',
  };

  /**
   * Merge the default config with the config obj passed to method
   * @param config
   */
  public mergeConfig(config: Partial<RendererConfig>) {
    if (typeof config.dev === 'boolean') {
      this.config.dev = config.dev;
    }
    if (typeof config.viewsDir === 'string' || config.viewsDir === null) {
      this.config.viewsDir = config.viewsDir;
    }
  }

  /**
   * Set the directory that Next will render pages from
   * @param path
   */
  public setViewsDir(path: string | null) {
    this.config.viewsDir = path;
  }

  /**
   * Get the directory that Next renders pages from
   */
  public getViewsDir() {
    return this.config.viewsDir;
  }

  /**
   * Explicitly set if env is or not dev
   * @param dev
   */
  public setIsDev(dev: boolean) {
    this.config.dev = dev;
  }

  /**
   * Get if the env is dev
   */
  public isDev(): boolean {
    return this.config.dev!;
  }

  /**
   * Set the default request handler provided by next
   * @param handler
   */
  public setRequestHandler(handler: RequestHandler) {
    this.requestHandler = handler;
  }

  /**
   * Get the default request handler
   */
  public getRequestHandler(): RequestHandler | undefined {
    return this.requestHandler;
  }

  /**
   * Set the render function provided by next
   * @param renderer
   */
  public setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  /**
   * Get the render function provided by next
   */
  public getRenderer(): Renderer | undefined {
    return this.renderer;
  }

  /**
   * Set nextjs error renderer
   * @param errorRenderer
   */
  public setErrorRenderer(errorRenderer: ErrorRenderer) {
    this.errorRenderer = errorRenderer;
  }

  /**
   * Get nextjs error renderer
   */
  public getErrorRenderer(): ErrorRenderer | undefined {
    return this.errorRenderer;
  }

  /**
   * Set a custom error handler
   * @param handler
   */
  public setErrorHandler(handler: ErrorHandler) {
    this.errorHandler = handler;
  }

  /**
   * Get the custom error handler
   */
  public getErrorHandler() {
    return this.errorHandler;
  }

  /**
   * Bind to the render function for the HttpServer that nest is using and override
   * it to allow for next to render the page
   * @param server
   */
  public bindHttpServer(server: HttpServer) {
    const renderer = this.getRenderer();
    const getViewPath = this.getViewPath.bind(this);

    server.render = (response: any, view: string, data: any) => {
      const isFastify = response.request !== undefined;

      const res = isFastify ? response.res : response;
      const req = isFastify ? response.request.raw : response.req;

      if (req && res && renderer) {
        return renderer(req, res, getViewPath(view), data);
      } else if (!renderer) {
        throw new InternalServerErrorException(
          'RenderService: renderer is not set',
        );
      } else if (!res) {
        throw new InternalServerErrorException(
          'RenderService: could not get the response',
        );
      } else if (!req) {
        throw new InternalServerErrorException(
          'RenderService: could not get the request',
        );
      }

      throw new Error('RenderService: failed to render');
    };

    // and nextjs renderer to reply/response
    if (server instanceof FastifyAdapter) {
      server
        .getInstance()
        .decorateReply('render', function(view: string, data?: ParsedUrlQuery) {
          const res = this.res;
          const req = this.request.raw;

          if (!renderer) {
            throw new InternalServerErrorException(
              'RenderService: renderer is not set',
            );
          }

          return renderer(req, res, getViewPath(view), data);
        } as RenderableResponse['render']);
    } else {
      server.getInstance().use((req: any, res: any, next: () => any) => {
        res.render = ((view: string, data?: ParsedUrlQuery) => {
          if (!renderer) {
            throw new InternalServerErrorException(
              'RenderService: renderer is not set',
            );
          }
          return renderer(req, res, getViewPath(view), data);
        }) as RenderableResponse['render'];

        next();
      });
    }
  }

  /**
   * Check if the URL is internal to nextjs
   * @param url
   */
  public isInternalUrl(url: string): boolean {
    return isInternalUrl(url);
  }

  /**
   * Format the path to the view
   * @param view
   */
  protected getViewPath(view: string) {
    const baseDir = this.getViewsDir();
    const basePath = baseDir ? baseDir : '';
    return `${basePath}/${view}`;
  }
}
