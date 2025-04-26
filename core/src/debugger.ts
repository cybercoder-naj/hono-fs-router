import util from 'node:util';

export function debuglog(msg: string, ...params: unknown[]): void {
  const debuglog = util.debuglog('hono:fs-router');
  debuglog(msg, ...params);
}
