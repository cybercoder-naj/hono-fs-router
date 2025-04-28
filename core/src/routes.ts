import { debuglog } from './debugger';

export const httpMethods = ['get' , 'post' , 'put' , 'delete' , 'head' , 'options'] as const;
export type HttpMethod = typeof httpMethods[number];

export type Route = {
  path: string;
  method: HttpMethod | 'all';
};

export async function routeTransformer(name: string): Promise<Route> {
  const regex = /^(.*?)(?:\.(get|post|put|delete|all))?\.(?:ts|js)$/i;
  const match = name.match(regex);
  if (!match) 
    throw new Error(`Invalid file name: ${name}`);

  if (match.length < 2 || match.length > 3)
    throw new Error(`Invalid file name: ${name}`);

  const [_, _path, _method] = match;
  const path = _path === 'index' ? '' : _path!.toLowerCase();
  const method = _method ? _method.toLowerCase() as HttpMethod : undefined;

  if (method && !httpMethods.includes(method)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  const route: Route = {
    path: path.startsWith('/') ? path : `/${path}`,
    method: method || 'all',
  }
  debuglog('File name (%s) transformed to route: %o', name, route);

  return route;
}