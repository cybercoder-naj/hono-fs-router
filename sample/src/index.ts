import { Hono } from 'hono'
import { fsRouter } from 'hono-fs-router';
import { showRoutes } from 'hono/dev'
import path from 'node:path'

const app = new Hono()
  .route('/', await fsRouter(path.join(import.meta.dir, 'routes')))

showRoutes(app)

export default app
