import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { parse as parseUrl } from 'url';
import { RenderService } from './render.service';
import { ErrorResponse } from './types';

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
   * @param host
   */
  public async catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

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

      const isFastify = !!response.res;

      const res: ServerResponse = isFastify ? response.res : response;
      const req: IncomingMessage = isFastify ? request.raw : request;

      if (!res.headersSent && req.url) {
        // check to see if the URL requested is an internal nextjs route
        // if internal, the url is to some asset (ex /_next/*) that needs to be rendered by nextjs
        if (this.service.isInternalUrl(req.url)) {
          if (isFastify) {
            response.sent = true;
          }
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

        const serializedErr = this.serializeError(err);

        if (isFastify) {
          response.sent = true;
        }

        if (res.statusCode === HttpStatus.NOT_FOUND) {
          return errorRenderer(null, req, res, pathname, {
            ...query,
            [Symbol.for('Error')]: serializedErr,
          });
        }

        return errorRenderer(serializedErr, req, res, pathname, query);
      }

      return;
    }

    // if the request and/or response are undefined (as with GraphQL) rethrow the error
    throw err;
  }

  /**
   * Serialize the error similarly to method used in Next -- parse error as Nest error type
   * @param err
   */
  public serializeError(err: any): ErrorResponse {
    const out: ErrorResponse = {};

    if (!err) {
      return out;
    }

    if (err.stack && this.service.isDev()) {
      out.stack = err.stack;
    }

    if (err.response && typeof err.response === 'object') {
      const { statusCode, error, message } = err.response;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    } else if (err.message && typeof err.message === 'object') {
      const { statusCode, error, message } = err.message;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    }

    if (!out.statusCode && err.status) {
      out.statusCode = err.status;
    }

    if (!out.message && err.message) {
      out.message = err.message;
    }

    return out;
  }
}
