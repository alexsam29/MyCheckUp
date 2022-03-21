import winston, { format, transports } from 'winston'
import path from 'path'
import { PROD, LOG_DIR } from './constants'

/**
 * Main logger instance throughout the API.
 */
export const logger = winston.createLogger({
   levels: {
      error: 0,
      info: 6,
      debug: 7,
   },
   format: format.combine(
      format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.simple()
   ),
   transports: [
      new transports.File({
         filename: path.join(LOG_DIR, 'error.log'),
         level: 'error',
      }),
      new transports.File({
         filename: path.join(LOG_DIR, 'global.log'),
         level: 'info',
      }),
   ],
})

// Also log to the console if not in production mode
if (!PROD) {
   logger.add(
      new transports.Console({
         format: format.combine(
            format.colorize({
               all: true,
               colors: { info: 'yellow', error: 'red', debug: 'bold blue' },
            }),
            format.simple()
         ),
      })
   )
}
