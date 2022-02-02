import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { DoctorService } from '../services/doctor-service'
import { ApiError } from '../exceptions/api-error'
import { SESSION_COOKIE } from '../common/constants'

/**
 * Handles operations on Doctor account.
 */
export const DoctorController = {
   /**
    * Log in and get session cookie.
    */
   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Invalid data in the request body', errors.array())
         }

         const { email, password } = req.body
         const doctor = await DoctorService.findByCredentials(email, password)

         req.session.valid = true
         req.session.userId = doctor.id
         req.session.role = doctor.role

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
    * Register new doctor account.
    */
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Invalid data in the request body', errors.array())
         }

         const doctor = await DoctorService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            license: req.body.license,
            specialty: req.body.specialty,
            title: req.body.title,
            phoneNumber: req.body.phoneNumber,
         })

         return res.status(200).json(doctor)
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Update current doctor's account.
    */
   async updateSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Invalid data in the request body', errors.array())
         }

         const doctor = await DoctorService.update({
            id: req.session.userId || '',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            license: req.body.license,
            specialty: req.body.specialty,
            title: req.body.title,
            phoneNumber: req.body.phoneNumber,
         })

         return res.status(200).json(doctor)
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Find current doctor's account.
    */
   async getSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor = await DoctorService.findOne({ id: req.session.userId })
         return res.status(200).json(doctor)
      }
      catch (err: unknown) {
         return next(err)
      }
   },

   /**
    * Delete current doctor's account.
    */
   async deleteSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor = await DoctorService.remove(req.session.userId || '')
         return res.status(200).json({ message: `Doctor account ${doctor.id} has been deleted` })
      }
      catch (err: unknown) {
         return next(err)
      }
   }
}
