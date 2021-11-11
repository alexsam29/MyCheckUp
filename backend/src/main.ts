import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import config from 'config'
import { createConnection, ConnectionOptions } from 'typeorm'
import { router } from './routes/router'
import { notFoundHandler } from './middleware/not-found-handler'
import { errorHandler } from './middleware/error-handler'
import { PORT, PROD } from './common/constants'
import { logger } from './common/logger'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(notFoundHandler)
app.use(errorHandler)

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
         logging: false
      } as ConnectionOptions)

      app.listen(PORT, () => logger.info(`Server started on port ${PORT}`))
   }
   catch (err: unknown) {
      logger.error(err)
   }
}

main()
