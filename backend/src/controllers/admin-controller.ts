import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { AdminService } from '../services/admin-service'
import { DoctorService } from '../services/doctor-service'
import { ApiError } from '../exceptions/api-error'
import { SESSION_COOKIE } from '../common/constants'
import { mailTransport } from '../common/mail-transport'
import { GetDoctorsQuery } from './utils/admin-utils'

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
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const { email, password } = req.body
         const admin = await AdminService.findByCredentials(email, password)

         // Establish the session:
         req.session.valid = true
         req.session.userId = admin.id
         req.session.role = admin.role

         return res.status(200).json({ success: true })
      } catch (error: unknown) {
         return next(error)
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
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Find current admin's account.
    */
   async getSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const admin = await AdminService.findOne({ id: req.session.userId })
         return res.status(200).json(admin)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Register new admin account.
    */
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const admin = await AdminService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
         })

         return res.status(200).json(admin)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Get doctor profiles.
    */
   async getDoctors(
      req: Request<unknown, unknown, unknown, GetDoctorsQuery>,
      res: Response,
      next: NextFunction
   ) {
      try {
         const { active } = req.query
         const searchBy: any = {}

         if (active === 'true') searchBy.active = true
         else if (active === 'false') searchBy.active = false

         const doctors = await DoctorService.find(searchBy, {
            exact: true,
            offset: 0,
            limit: 100,
         })

         return res.status(200).json(doctors)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Activate doctor account by id.
    */
   async activateDoctorById(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params

         const updatedDoctor = await DoctorService.update({
            id: doctorId,
            active: true,
         })

         const transport = await mailTransport()
         await transport.sendMail({
            from: 'MyCheckUp Team <info@mycheckup.com>',
            to: updatedDoctor.email,
            subject: 'Your doctor account have been activated!',
            text: `Hello, ${updatedDoctor.firstName}, your doctor account have been activated!`,
         })

         return res.status(200).json(updatedDoctor)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Deactivate doctor account by id.
    */
   async deactivateDoctorById(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params

         const updatedDoctor = await DoctorService.update({
            id: doctorId,
            active: false,
         })

         const transport = await mailTransport()
         await transport.sendMail({
            from: 'MyCheckUp Team <info@mycheckup.com>',
            to: updatedDoctor.email,
            subject: 'Your doctor account have been deactivated',
            text: `Hello, ${updatedDoctor.firstName}, your doctor account have been deactivated.`,
         })

         return res.status(200).json(updatedDoctor)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Delete doctor account by id.
    */
   async deleteDoctorById(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params
         const removedDoctor = await DoctorService.remove(doctorId)

         const transport = await mailTransport()
         await transport.sendMail({
            from: 'MyCheckUp Team <info@mycheckup.com>',
            to: removedDoctor.email,
            subject: 'Your doctor account have been deleted',
            text: `Hello, ${removedDoctor.firstName}, your doctor have been deleted by the administration.`,
         })

         return res.status(200).send()
      } catch (error: unknown) {
         return next(error)
      }
   },
}
