import { HttpServer, Injectable } from '@nestjs/common';
import { ErrorRenderer, Renderer, RequestHandler } from './types';

@Injectable()
class RenderService {
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private errorRenderer?: ErrorRenderer;
  private res?: any;
  private req?: any;

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
   * Set the current req and res
   * @param req
   * @param res
   */
  public next(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  /**
   * Bind to the render function for the HttpServer that nest is using and override
   * it to allow for next to render the page
   * @param server
   */
  public bindHttpServer(server: HttpServer) {
    server.render = (_: any, view: string, options: any) => {
      const renderer = this.getRenderer();

      if (this.req && this.res && renderer) {
        return renderer(this.req, this.res, `/views/${view}`, options);
      } else if (!this.req) {
        throw new Error('RenderService: req is not defined.');
      } else if (!this.res) {
        throw new Error('RenderService: res is not defined.');
      } else if (!renderer) {
        throw new Error('RenderService: renderer is not set.');
      }

      throw new Error('RenderService: failed to render');
    };
  }
}

export default RenderService;
