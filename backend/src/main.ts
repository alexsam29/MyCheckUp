import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import config from 'config'
import { createConnection, ConnectionOptions, getRepository } from 'typeorm'
import { userSession } from './common/user-session'
import { Session } from './models/session'
import { router } from './routes'
import { notFoundHandler } from './middleware/not-found-handler'
import { errorHandler } from './middleware/error-handler'
import { PORT, PROD } from './common/constants'
import { logger } from './common/logger'

const app = express()
if (PROD) app.set('trust proxy', 1)
app.use(express.json())
app.use(
   cors({
      origin: config.get('client.origin'),
      credentials: true,
   })
)

const main = async () => {
   try {
      // Database Connection:
      await createConnection({
         type: config.get('database.type'),
         host: config.get('database.host'),
         port: config.get('database.port'),
         username: config.get('database.username'),
         password: config.get('database.password'),
         database: config.get('database.name'),
         entities: config.get('typeorm.entities'),
         synchronize: !PROD,
         logging: false,
      } as ConnectionOptions)

      app.use(userSession(getRepository(Session)))
      app.use(router)
      app.use(notFoundHandler)
      app.use(errorHandler)

      app.listen(PORT, () => logger.info(`Server started on port ${PORT}`))
   } catch (err: unknown) {
      logger.error(err)
   }
}

main()
