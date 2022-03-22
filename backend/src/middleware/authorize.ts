import { Request, Response, NextFunction } from 'express'
import { Role } from '../models/role'
import { authenticate } from './authenticate'
import { ApiError } from '../exceptions/api-error'

/**
 * Middleware for securing routes.
 * Restricts access to a route based on the provided roles.
 * Includes authenticate middleware in the chain.
 */
export const authorize = (roles: Role | Role[] = []) => {
   return [
      authenticate,
      (req: Request, _: Response, next: NextFunction) => {
         if (!(roles instanceof Array)) {
            roles = [roles]
         }

         if (roles.length) {
            let authorized = false

            roles.forEach(role => {
               switch (role) {
                  case Role.PATIENT:
                     if (req.session?.role === Role.PATIENT) authorized = true
                     break
                  case Role.DOCTOR:
                     if (req.session?.role === Role.DOCTOR) authorized = true
                     break
                  case Role.ADMIN:
                     if (req.session?.role === Role.ADMIN) authorized = true
                     break
                  default:
                     authorized = false
               }
            })

            if (!authorized) return next(ApiError.Forbidden())
         }

         return next()
      },
   ]
}
