import { debuglog } from './debugger';

export type Route = {
  path: string;
  method: string; // TODO: use enum or unions
};

export async function routeTransformer(name: string): Promise<Route> {
  const regex = /^(.*?)(?:\.(get|post|put|delete|all))?\.(?:ts|js)$/;
  const match = name.match(regex);
  if (!match) 
    throw new Error(`Invalid file name: ${name}`);

  if (match.length < 2 || match.length > 3)
    throw new Error(`Invalid file name: ${name}`);

  const [_, path, method] = match;
  const route: Route = {
    path: path === 'index' ? '/' : path!,
    method: method || 'all',
  }
  debuglog('File name (%s) transformed to route: %o', name, route);

  return route;
}