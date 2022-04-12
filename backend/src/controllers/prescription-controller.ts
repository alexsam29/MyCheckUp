import { Request, Response, NextFunction } from 'express'
import { PrescriptionService } from '../services/prescription-service'

export const PrescriptionController = {
   async getPatientPrescription(req: Request, res: Response, next: NextFunction) {
      try {
         const { userId: patientId } = req.session

         const prescriptions = await PrescriptionService.find({
            patientId
         })
         return res.status(200).json(prescriptions)
      } catch (err: unknown) {
         return next(err)
      }
   },
}
