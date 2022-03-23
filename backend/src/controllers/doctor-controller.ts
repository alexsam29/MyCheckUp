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
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const { email, password } = req.body
         const doctor = await DoctorService.findByCredentials(email, password)

         req.session.valid = true
         req.session.userId = doctor.id
         req.session.role = doctor.role

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
    * Register new doctor account.
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
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Update current doctor's account.
    */
   async updateSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const doctor = await DoctorService.update({
            id: req.session.userId!,
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
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Find current doctor's account.
    */
   async getSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor = await DoctorService.findOne({ id: req.session.userId })
         return res.status(200).json(doctor)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Find all active doctors.
    */
   async getAll(_: Request, res: Response, next: NextFunction) {
      try {
         const doctors = await DoctorService.find({ active: true })
         return res.status(200).json(doctors)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Find active doctor by id.
    */
   async getOneById(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params
         const doctor = await DoctorService.findOne({ id: doctorId })

         if (!doctor.active) {
            throw ApiError.NotFound('Doctor not found')
         }

         return res.status(200).json(doctor)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Delete current doctor's account.
    */
   async deleteSelf(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor = await DoctorService.remove(req.session.userId || '')
         return res
            .status(200)
            .json({ message: `Doctor account ${doctor.id} has been deleted` })
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Set doctor availability for selected week day.
    */
   async setAvailability(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const { weekDay } = req.params
         const weekDayNum = Number(weekDay)
         if (isNaN(weekDayNum) || weekDayNum < 0 || weekDayNum > 6) {
            throw ApiError.BadRequest(
               'Invalid week day parameter. It must be an integer number between 0 and 6.'
            )
         }

         const timeFrom = req.body.availableFrom
         const timeTo = req.body.availableTo
         const duration = Number(req.body.appointmentDuration)

         if (timeFrom && timeTo && timeFrom > timeTo) {
            throw ApiError.BadRequest(
               'Invalid time. Available from must be less than available to.'
            )
         }
         if ((duration && isNaN(duration)) || duration < 0 || duration > 60) {
            throw ApiError.BadRequest(
               'Invalid appointment duration in minutes. It must be an integer number between 0 and 60.'
            )
         }

         const availability = await DoctorService.setAvailability({
            doctorId: req.session.userId!,
            weekDay: weekDayNum,
            isAvailable: req.body.isAvailable,
            availableFrom: timeFrom,
            availableTo: timeTo,
            appointmentDuration: duration,
         })

         return res.status(200).json(availability)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    *
    */
   async getAvailabilityByDay(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId, weekDay } = req.params

         const weekDayNum = Number(weekDay)
         if (isNaN(weekDayNum) || weekDayNum < 0 || weekDayNum > 6) {
            throw ApiError.BadRequest(
               'Invalid week day parameter. It must be an integer number between 0 and 6.'
            )
         }

         const availability = await DoctorService.findAvailabilityByDay(
            doctorId,
            weekDayNum
         )

         return res.status(200).json(availability)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    *
    */
   async getFullAvailability(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params

         const availability = await DoctorService.findAvailability(doctorId)

         return res.status(200).json(availability)
      } catch (error: unknown) {
         return next(error)
      }
   },
}
