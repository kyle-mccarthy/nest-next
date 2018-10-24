export type RequestHandler = (req: any, res: any, query?: any) => Promise<void>;

export type Renderer = (
  req: any,
  res: any,
  view: string,
  params?: any
) => Promise<void>;

export type ErrorRenderer = (
  err: any,
  req: any,
  res: any,
  pathname: any,
  query?: any
) => Promise<void>;
