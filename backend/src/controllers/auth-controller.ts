import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error'
import { SESSION_COOKIE } from '../common/constants'
import { Role } from '../models/role'
import { AdminController } from './admin-controller'
import { DoctorController } from './doctor-controller'
import { PatientController } from './patient-controller'

/**
 * Handles authentication operations.
 */
export const AuthController = {
   /**
    * Log in and get session cookie.
    *
    * Requires additional `role` property in the body.
    */
   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const { role } = req.body

         switch (role) {
            case Role.ADMIN:
               AdminController.login(req, res, next)
               break
            case Role.DOCTOR:
               DoctorController.login(req, res, next)
               break
            case Role.PATIENT:
               PatientController.login(req, res, next)
               break
            default:
               throw ApiError.BadRequest('Invalid role property in the request body')
         }
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Log out and destroy session.
    *
    * This method works universally for all roles.
    */
   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         req.session.destroy(() => {
            return res.clearCookie(SESSION_COOKIE).status(200).send()
         })
      } catch (error: unknown) {
         return next(error)
      }
   },
}
