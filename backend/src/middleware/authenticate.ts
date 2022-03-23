import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'

/**
 * Middleware for securing routes.
 * Authenticates user by validating session cookie.
 */
export const authenticate = (req: Request, _: Response, next: NextFunction) => {
   if (!req.session || !req.session.valid) {
      return next(ApiError.Unauthorized())
   }

   return next()
}
