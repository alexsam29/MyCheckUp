import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import { validationResult } from 'express-validator'
import { AppointmentService } from '../services/appointment-service'
//import { DoctorService } from 'services/doctor-service'

export const AppointmentsController = {
   // create appointment for patient
   async setAppointment(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty())
            throw ApiError.BadRequest(
               'Invalid data in the request body!',
               errors.array()
            )

         const Appointment = await AppointmentService.setAppointment({
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            //selfAssessmentId: req.body.selfAssessmentId,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            doctorNotes: req.body.doctorNotes,
         })

         return res.status(200).json(Appointment)
      } catch (err: unknown) {
         return next(err)
      }
   },

   // get all the booked "pending" appointments base on patientID
   async getAppointments(req: Request, res: Response, next: NextFunction) {
      try {
         const { patientId } = req.params

         const appointments = await AppointmentService.findAppointment({ patientId })
         return res.status(200).json(appointments)
      } catch (err: unknown) {
         return next(err)
      }
   },

   /* Doctor ***********************************************************************************/

   //Used in the doctor router to get all the appointment times.
   async getAppointmentTimes(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId } = req.params

         const appointmentTimes = await AppointmentService.appointmentTimesBooked({
            doctorId,
         })
         return res.status(200).json(appointmentTimes)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async getAvailableTimes(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorId, date } = req.params
         const status = 'pending'

         const appointmentTimes = await AppointmentService.appointmentTimesAvailable(
            doctorId,
            { doctorId, date, status }
         )
         console.log(appointmentTimes)
         return res.status(200).json(appointmentTimes)
      } catch (err: unknown) {
         return next(err)
      }
   },
}
