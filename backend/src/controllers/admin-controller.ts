import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { AdminService } from '../services/admin-service'
import { ApiError } from '../exceptions/api-error'
import { SESSION_COOKIE } from '../common/constants'

/**
 * Handles operations on Admin account.
 */
export const AdminController = {
   /**
    * Log in and get session cookie.
    */
   async login(req: Request, res: Response, next: NextFunction) {
      try {
         // Validate incoming data:
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Invalid data in the request body', errors.array())
         }

         const { email, password } = req.body
         const admin = await AdminService.findByCredentials(email, password)

         // Establish the session:
         req.session.valid = true
         req.session.userId = admin.id
         req.session.role = admin.role

         return res.status(200).json({ success: true })
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Log out and destroy session.
    */
   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         req.session.destroy(() => {
            return res.clearCookie(SESSION_COOKIE).status(200).send()
         })
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Find current admin's account.
    */
   async getSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const admin = await AdminService.findOne({ id: req.session.userId })
         return res.status(200).json(admin)
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Register new admin account.
    */
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Invalid data in the request body', errors.array())
         }

         const admin = await AdminService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
         })

         return res.status(200).json(admin)
      }
      catch (err: unknown) {
         return next(err)
      }
   }
}
