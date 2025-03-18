import { Hono } from 'hono'
import { fsRouter } from 'hono-fs-router';
import { showRoutes } from 'hono/dev'
import path from 'node:path'

const app = new Hono()
  .route('/', await fsRouter(path.join(import.meta.dir, 'routes')))
  .delete('/', async (c) => c.json({ message: 'Hello, World!' }))

showRoutes(app)

export default app
