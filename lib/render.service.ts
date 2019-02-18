import {
  HttpServer,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/core';
import { ErrorRenderer, Renderer, RequestHandler } from './types';

@Injectable()
export class RenderService {
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private errorRenderer?: ErrorRenderer;
  private viewsDir: string | null = '/views';

  /**
   * Set the directory that Next will render pages from
   */
  public setViewsDir(path: string | null) {
    this.viewsDir = path;
  }

  /**
   * Get the directory that Next renders pages from
   */
  public getViewsDir() {
    return this.viewsDir;
  }

  /**
   * Set the default request handler provided by next
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
   * Bind to the render function for the HttpServer that nest is using and override
   * it to allow for next to render the page
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
        .decorateReply('render', function(view: string, data?: any) {
          const res = this.res;
          const req = this.request.raw;

          if (!renderer) {
            throw new InternalServerErrorException(
              'RenderService: renderer is not set',
            );
          }

          return renderer(req, res, getViewPath(view), data);
        });
    } else {
      server.getInstance().use((req: any, res: any, next: () => any) => {
        res.render = (view: string, data?: any) => {
          if (!renderer) {
            throw new InternalServerErrorException(
              'RenderService: renderer is not set',
            );
          }
          return renderer(req, res, getViewPath(view), data);
        };

        next();
      });
    }
  }

  /**
   * Format the path to the view
   */
  protected getViewPath(view: string) {
    const baseDir = this.getViewsDir();
    const basePath = baseDir ? baseDir : '';
    return `${basePath}/${view}`;
  }
}
