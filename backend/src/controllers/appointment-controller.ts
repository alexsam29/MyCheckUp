import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import { validationResult } from 'express-validator'
import { AppointmentService } from '../services/appointment-service'

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
         const { userId: patientId } = req.session

         const appointments = await AppointmentService.findAppointment({ patientId })
         return res.status(200).json(appointments)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async getPatientAppointmentById(req: Request, res: Response, next: NextFunction) {
      try {
         const appointment = await AppointmentService.findAppointmentById(
            req.params.appointmentId
         )
         if (appointment.patientId !== req.session.userId) {
            throw ApiError.Forbidden()
         }

         return res.status(200).json(appointment)
      } catch (error: unknown) {
         return next(error)
      }
   },
   async cancellingAppointment(req: Request, res: Response, next: NextFunction) {
      try {
         const deletedAppointment = await AppointmentService.deleteingAppointment(
            req.params.id
         )

         return res.status(200).json(deletedAppointment)
      } catch (err: unknown) {
         return next(err)
      }
   },

   async rescheduleAppointment(req: Request, res: Response, next: NextFunction) {
      try {
         const { id, date, startTime, endTime } = req.params

         const rescheduledAppointment =
            await AppointmentService.rescheduleAppointment(
               id,
               date,
               startTime,
               endTime
            )

         return res.status(200).json(rescheduledAppointment)
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

   async getDoctorAppointments(req: Request, res: Response, next: NextFunction) {
      try {
         const { userId: doctorId } = req.session
         const appointments = await AppointmentService.findAppointment({ doctorId })

         return res.status(200).json(appointments)
      } catch (error: unknown) {
         return next(error)
      }
   },
}
