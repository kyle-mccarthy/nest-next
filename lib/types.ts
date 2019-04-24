import { ParsedUrlQuery } from 'querystring';

export type RequestHandler = (req: any, res: any, query?: any) => Promise<void>;

export type Renderer = (
  req: any,
  res: any,
  view: string,
  params?: any,
) => Promise<void>;

export type ErrorRenderer = (
  err: any,
  req: any,
  res: any,
  pathname: any,
  query?: any,
) => Promise<void>;

export type ErrorHandler = (
  err: any,
  req: any,
  res: any,
  pathname: any,
  query: ParsedUrlQuery,
) => Promise<any>;

export interface RendererConfig {
  viewsDir: null | string;
  dev: boolean;
}

export interface ErrorResponse {
  name?: string;
  message?: string;
  stack?: any;
  statusCode?: number;
}
