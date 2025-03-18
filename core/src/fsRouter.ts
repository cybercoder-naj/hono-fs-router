import fs from 'node:fs/promises';
import { type Env, Hono, type Schema } from 'hono';
import type { BlankEnv, BlankSchema } from 'hono/types';
import { routeTransformer } from './utils';

export async function fsRouter<
  E extends Env = BlankEnv,
  S extends Schema = BlankSchema,
  P extends string = '/',
>(path: string): Promise<Hono<E, S, P>> {
  // FIXME: assert if path exists
  const files = await fs.readdir(path);

  const hono = new Hono<E, S, P>();
  for (const file of files) {
    const route = await routeTransformer(file);
    const handler = (await import(`${path}/${file}`)).default;

    hono.on(route.method, route.path, ...handler);
  }

  return hono;
}