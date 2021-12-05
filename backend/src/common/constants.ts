import path from 'path'

export const PROD = process.env.NODE_ENV === 'production'
export const PORT = process.env.PORT || 5000
export const LOG_DIR = path.join(__dirname, '../../logs')

// Session:
export const SESSION_COOKIE = 'MCUSessionId'
export const SESSION_COOKIE_MAXAGE = 3600000
