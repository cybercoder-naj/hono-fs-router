import type { Route } from "./types";

export async function routeTransformer(name: string): Promise<Route> {
  const [path, method, ext] = name.split('.');
  if (!path || !method) {
    throw new Error(`Invalid route file name. Received: ${name}`);
  }

  const pathTransformed = name === 'index' ? '/' : path;
  const methodTransformed = !ext ? 'all' : method.toLowerCase();

  return {
    path: pathTransformed,
    method: methodTransformed,
  };
}