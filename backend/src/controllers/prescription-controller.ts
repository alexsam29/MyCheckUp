import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { PrescriptionService } from '../services/prescription-service'
import { ApiError } from '../exceptions/api-error'
import { PrescriptionStatus } from '../models/prescription-status'

export const PrescriptionController = {
   async getPatientPrescription(req: Request, res: Response, next: NextFunction) {
      try {
         const { userId: patientId } = req.session

         const prescriptions = await PrescriptionService.find({
            patientId,
         })
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

         const date = new Date(req.body.expiryDate)
         const status =
            req.session.role === 'patient'
               ? PrescriptionStatus.PENDING
               : req.body.status

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
}
