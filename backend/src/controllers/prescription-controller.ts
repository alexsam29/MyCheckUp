import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { PrescriptionService } from '../services/prescription-service'
import { ApiError } from '../exceptions/api-error'
import { PrescriptionStatus } from '../models/prescription-status'
import { GetDoctorPrescriptionsQuery } from './utils/queries'
import { paramToInt } from '../common/utils'

export const PrescriptionController = {
   async getPatientPrescriptions(req: Request, res: Response, next: NextFunction) {
      try {
         const { userId: patientId } = req.session
         const prescriptions = await PrescriptionService.find({ patientId })

         return res.status(200).json(prescriptions)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async getDoctorPrescriptions(
      req: Request<unknown, unknown, unknown, GetDoctorPrescriptionsQuery>,
      res: Response,
      next: NextFunction
   ) {
      try {
         const offset = paramToInt(req.query.offset) || 0
         const limit = paramToInt(req.query.limit) || 10
         const { userId: doctorId } = req.session
         const patientId = req.query.patientId
         const status = req.query.status

         const searchBy: { [key: string]: any } = {}
         searchBy.doctorId = doctorId
         if (patientId !== undefined) {
            if (
               !patientId.match(
                  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
               )
            ) {
               throw ApiError.BadRequest('Invalid patient id')
            }
            searchBy.patientId = patientId
         }
         if (status !== undefined) {
            searchBy.status = status
         }

         const prescriptions = await PrescriptionService.find(searchBy, {
            offset,
            limit,
         })

         return res.status(200).json(prescriptions)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async getPrescriptionById(req: Request, res: Response, next: NextFunction) {
      try {
         const prescription = await PrescriptionService.findById(req.params.id)

         if (
            req.session.role === 'patient' &&
            prescription.patientId !== req.session.userId
         ) {
            throw ApiError.Forbidden()
         }

         return res.status(200).json(prescription)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async getAll(_: Request, res: Response, next: NextFunction) {
      try {
         const prescriptions = await PrescriptionService.find()

         return res.status(200).json(prescriptions)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async create(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         let date: Date
         if (req.body.expiryDate) {
            date = new Date(req.body.expiryDate)
         } else {
            date = new Date()
            date.setDate(date.getDate() + 10)
         }

         let status: PrescriptionStatus
         if (req.body.status) {
            status = req.body.status
         } else {
            status =
               req.session.role === 'patient'
                  ? PrescriptionStatus.PENDING
                  : PrescriptionStatus.APPROVED
         }

         const prescription = await PrescriptionService.create({
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            description: req.body.description,
            numOfRefill: req.body.numOfRefill,
            expiryDate: date,
            status: status,
            requestedByPatient: req.session.role === 'patient',
         })

         return res.status(200).json(prescription)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async setStatus(req: Request, res: Response, next: NextFunction) {
      try {
         const prescription = await PrescriptionService.update({
            id: req.params.id,
            status: req.body.status,
         })
         return res.status(200).json(prescription)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const prescription = await PrescriptionService.remove(req.params.id)
         return res.status(200).json(prescription)
      } catch (err: unknown) {
         return next(err)
      }
   },
}
