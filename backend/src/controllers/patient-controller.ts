import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import { validationResult } from 'express-validator'
import { PatientService } from '../services/patient-service'
import { SESSION_COOKIE } from '../common/constants'

// Manages operations on Patient account.
export const PatientController = {
   async login(req: Request, res: Response, next: NextFunction) {
      try {
         // Validating data
         const error = validationResult(req)

         if (!error.isEmpty())
            throw ApiError.BadRequest('Invalid data request: ', error.array())

         const { email, password } = req.body

         const patient = await PatientService.findByCredentials(email, password)

         req.session.valid = true
         req.session.userId = patient.id
         req.session.role = patient.role

         return res.status(200).json({ sucess: true })
      } catch (err: unknown) {
         return next(err)
      }
   },

   //Log out and destroy session.

   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         req.session.destroy(() => {
            return res.clearCookie(SESSION_COOKIE).status(200).send()
         })
      } catch (err: unknown) {
         return next(err)
      }
   },

   // Find current patient's account.
   async getSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = await PatientService.findOne({ id: req.session.userId })
         return res.status(200).json(patient)
      } catch (err: unknown) {
         return next(err)
      }
   },

   // Register new patient account.
   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const patient = await PatientService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            healthCardNum: req.body.healthCardNum,
            gender: req.body.gender,
         })

         return res.status(200).json(patient)
      } catch (err: unknown) {
         return next(err)
      }
   },

   // Update patient profile
   async updateProfile(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty())
            throw ApiError.BadRequest(
               'Invalid data in the request body!',
               errors.array()
            )

         const UpdatePateint = await PatientService.update({
            id: req.body.id,
            email: req.body.email,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            phonenumber: req.body.phoneNumber,
            address: req.body.address,
            gender: req.body.gender,
         })

         return res.status(200).json(UpdatePateint)
      } catch (err: unknown) {
         return next(err)
      }
   },

   // Update patient password
   async updatecredentials(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty())
            throw ApiError.BadRequest(
               'Invalid data in the request body!',
               errors.array()
            )

         const UpdatePateint = await PatientService.updateCredentials({
            id: req.body.id,
            password: req.body.password,
         })

         return res.status(200).json(UpdatePateint)
      } catch (err: unknown) {
         return next(err)
      }
   },
}
