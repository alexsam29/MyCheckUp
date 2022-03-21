import 'reflect-metadata'
import config from 'config'
import { createConnection, ConnectionOptions } from 'typeorm'
import { logger } from '../common/logger'
import { setAdmin } from './set-admin'

const main = async () => {
   try {
      const connection = await createConnection({
         type: config.get('database.type'),
         host: config.get('database.host'),
         port: config.get('database.port'),
         username: config.get('database.username'),
         password: config.get('database.password'),
         database: config.get('database.name'),
         entities: config.get('typeorm.entities'),
         synchronize: true,
         logging: true,
      } as ConnectionOptions)

      await setAdmin()

      await connection.close()

      logger.info('Deloyment process have been completed')
   } catch (err: unknown) {
      logger.error(err)
   }
}

main()
