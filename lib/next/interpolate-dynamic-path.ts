import { ParsedUrlQuery } from 'querystring';
import { getNamedRouteRegex } from './route-regex';

export function interpolateDynamicPath(
  pathname: string,
  params: ParsedUrlQuery,
  defaultRouteRegex?: ReturnType<typeof getNamedRouteRegex> | undefined,
) {
  if (!defaultRouteRegex) return pathname;

  for (const param of Object.keys(defaultRouteRegex.groups)) {
    const { optional, repeat } = defaultRouteRegex.groups[param];
    let builtParam = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      builtParam = `[${builtParam}]`;
    }

    const paramIdx = pathname!.indexOf(builtParam);

    if (paramIdx > -1) {
      let paramValue: string;
      const value = params[param];

      if (Array.isArray(value)) {
        paramValue = value.map((v) => v && encodeURIComponent(v)).join('/');
      } else if (value) {
        paramValue = encodeURIComponent(value);
      } else {
        paramValue = '';
      }

      pathname =
        pathname.slice(0, paramIdx) +
        paramValue +
        pathname.slice(paramIdx + builtParam.length);
    }
  }

  return pathname;
}
