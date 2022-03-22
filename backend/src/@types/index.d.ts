import 'express-session'

// Global type overrides & extensions:

declare module 'express-session' {
   interface SessionData {
      valid: boolean
      userId: string
      role: string
   }
}
