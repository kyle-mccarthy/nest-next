import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { parse as parseUrl } from 'url';
import { ErrorRenderer, RequestHandler } from './types';

@Catch()
class RenderFilter implements ExceptionFilter {
  private readonly requestHandler: RequestHandler;
  private readonly errorRenderer: ErrorRenderer;

  constructor(requestHandler: RequestHandler, errorRenderer: ErrorRenderer) {
    this.requestHandler = requestHandler;
    this.errorRenderer = errorRenderer;
  }

  /**
   * Nest isn't aware of how next handles routing for the build assets, let next
   * handle routing for any request that isn't handled by a controller
   * @param err
   * @param ctx
   */
  public async catch(err: any, ctx: ArgumentsHost) {
    const [req, res] = ctx.getArgs();
    
    const rawRes = res.res ? res.res : res;
    const rawReq = req.raw ? req.raw : req;

    if (!rawRes.headersSent) {
      if (err.response === undefined) {
        const { pathname, query } = parseUrl(req.raw.url, true);
        await this.errorRenderer(err, rawReq, rawRes, pathname, query);
      } else {
        await this.requestHandler(rawReq, rawRes);
      }
    }
  }
}

export default RenderFilter;
