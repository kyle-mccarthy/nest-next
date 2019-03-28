import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { parse as parseUrl } from 'url';
import { RenderService } from './render.service';

@Catch()
export class RenderFilter implements ExceptionFilter {
  private readonly service: RenderService;

  constructor(service: RenderService) {
    this.service = service;
  }

  /**
   * Nest isn't aware of how next handles routing for the build assets, let next
   * handle routing for any request that isn't handled by a controller
   * @param err
   * @param ctx
   */
  public async catch(err: any, ctx: ArgumentsHost) {
    const [request, response] = ctx.getArgs();

    if (response && request) {
      const requestHandler = this.service.getRequestHandler();
      const errorRenderer = this.service.getErrorRenderer();

      // these really should already always be set since it is done during the module registration
      // if somehow they aren't throw an error
      if (!requestHandler || !errorRenderer) {
        throw new Error(
          'Request and/or error renderer not set on RenderService',
        );
      }

      const res: ServerResponse = response.res ? response.res : response;
      const req: IncomingMessage = request.raw ? request.raw : request;

      if (!res.headersSent && req.url) {
        // check to see if the URL requested is an internal nextjs route
        // if internal, the url is to some asset (ex /_next/*) that needs to be rendered by nextjs
        if (this.service.isInternalUrl(req.url)) {
          return requestHandler(req, res);
        }

        // let next handle the error
        // it's possible that the err doesn't contain a status code, if this is the case treat
        // it as an internal server error
        res.statusCode = err && err.status ? err.status : 500;

        const { pathname, query } = parseUrl(req.url, true);

        const errorHandler = this.service.getErrorHandler();

        if (errorHandler) {
          await errorHandler(err, request, response, pathname, query);
        }

        if (response.sent === true || res.headersSent) {
          return;
        }

        return errorRenderer(err, req, res, pathname, query);
      }
    }
  }
}
