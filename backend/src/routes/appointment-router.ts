import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { AppointmentsController } from '../controllers/appointment-controller'

export const AppointmentRouter = express.Router()

/**
 * @openapi
 * /patient/appointment:
 *    put:
 *       summary: Book appointment for patient
 *       tags:
 *          - Appointments
 *       description: Book appointment for patient.
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.post(
   '/patient/appointment',
   body('patientId').notEmpty().isLength({ min: 1, max: 100 }),
   body('doctorId').notEmpty().isLength({ min: 1, max: 100 }),
   body('date').optional().trim().isLength({ min: 1, max: 10 }),
   body('startTime').optional().trim().isLength({ min: 1, max: 10 }),
   body('endTime').optional().trim().isLength({ min: 1, max: 10 }),
   body('doctorNotes').optional().isLength({ min: 0, max: 200 }),
   AppointmentsController.setAppointment
)

/**
 * @openapi
 * /patient/{patientId}/appointments:
 *    put:
 *       summary: Get all patient appointments from the appointment tabel.
 *       tags:
 *          - Patient
 *          - Appointments
 *       description: Get patient appointments from the appointment tabel.
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/patient/:patientId/appointments',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   AppointmentsController.getAppointments
)

/**
 * @openapi
 * /deleteAppointment/{id}:
 *    delete:
 *       summary: Delete appointment for patient.
 *       tags:
 *          - Appointments
 *       description: Delete appointment for patient
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.delete(
   '/deleteAppointment/:id',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   AppointmentsController.deleteAppointment
)

/**
 * @openapi
 * /doctor/{doctorId}/bookedTimes:
 *    get:
 *       summary: collect all the times for the doctor
 *       tags:
 *          - Doctor
 *          - Appointments
 *       description: collect all the times for the doctor.
 *       security:
 *          - coockieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/doctor/:doctorId/bookedTimes',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   AppointmentsController.getAppointmentTimes
)

/**
 * @openapi
 * /doctor/{doctorId}/availabileTimes/{date}:
 *    get:
 *       summary: collect all the times for the doctor
 *       tags:
 *          - Doctor
 *          - Appointments
 *       description: collect all the available and not available times for the doctor for that date.
 *       security:
 *          - coockieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/doctor/:doctorId/availabileTimes/:date',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   AppointmentsController.getAvailableTimes
)
