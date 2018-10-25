import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { RenderService } from './render.service';

@Injectable()
export class RenderMiddleware implements NestMiddleware {
  private readonly renderService: RenderService;

  public constructor(renderService: RenderService) {
    this.renderService = renderService;
  }

  /**
   * Set the current req and res in our render service
   * @param args
   */
  public resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      this.renderService.next(req, res);
      if (next) {
        next();
      }
    };
  }
}
