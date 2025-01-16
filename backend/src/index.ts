import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { folderRoutes } from './routes/folders'

const app = new Elysia()
  .use(cors())
  .use(folderRoutes)
  .listen(3000)