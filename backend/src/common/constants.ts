import path from 'path'
import config from 'config'

export const PROD = process.env.NODE_ENV === 'production'
export const PORT =
   process.env.PORT || config.get<string>('environment.port') || 5000
export const LOG_DIR = path.join(__dirname, '../../logs')
export const VERSION = '0.4.0'

// Session:
export const SESSION_COOKIE = 'MCUSessionId'
export const SESSION_COOKIE_MAXAGE = 3600000
