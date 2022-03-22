import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { AppointmentsController } from '../controllers/appointment-controller'
import { SelfAssessmentController } from '../controllers/self-assessment-controller'

export const AppointmentRouter = express.Router()

/** ~~~ Patient: ~~~ */

/**
 * @openapi
 * /patient/appointment:
 *    post:
 *       summary: Book appointment for patient
 *       tags:
 *          - Patient
 *          - Appointment
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
   //body('selfAssessmentId').optional().isLength({min: 0, max: 100}),
   body('date').optional().trim().isLength({ min: 1, max: 10 }),
   body('startTime').optional().trim().isLength({ min: 1, max: 10 }),
   body('endTime').optional().trim().isLength({ min: 1, max: 10 }),
   body('doctorNotes').optional().isLength({ min: 0, max: 200 }),
   AppointmentsController.setAppointment
)

/**
 * @openapi
 * /patient/appointments:
 *    get:
 *       summary: get all patient appointments
 *       tags:
 *          - Patient
 *          - Appointment
 *       description: Get patient appointments.
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/patient/appointments',
   authorize(Role.PATIENT),
   AppointmentsController.getAppointments
)

/**
 * @openapi
 * /patient/appointments/{appointmendId}:
 *    get:
 *       summary: get patient appointment by id
 *       tags:
 *          - Patient
 *          - Appointment
 *       description: Get patient appointment by id. Requires Patient authorization.
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/patient/appointments/:appointmentId',
   authorize(Role.PATIENT),
   AppointmentsController.getPatientAppointmentById
)

/**
 * @openapi
 * /patient/appointments/{appointmendId}/assessment:
 *    post:
 *       summary: send self-assessment for the appointment
 *       tags:
 *          - Patient
 *          - Appointment
 *          - Self-assessment
 *       description: Creates self-assessment for the appointment. Requires Patient authorization.
 *       security:
 *          - cookieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.post(
   '/patient/appointments/:appointmentId/assessment',
   authorize(Role.PATIENT),
   body('notes')
      .isString()
      .isLength({ min: 1, max: 255 })
      .trim()
      .withMessage('description must be a string between 1 and 255 characters'),
   body('symptomIds').optional().isArray({ min: 0, max: 20 }),
   SelfAssessmentController.create
)

/**
 * @openapi
 * /patient/{patientId}/appointments:
 *    get:
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
   authorize([Role.DOCTOR, Role.ADMIN]),
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
AppointmentRouter.put(
   '/cancellingAppointment/:id',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   AppointmentsController.cancellingAppointment
)

/**
 * @openapi
 * /reschedulingAppointment/{id}/{date}/{startTime}/{endTime}:
 *   put:
 *     summary: reschedule appointment
 *     tags:
 *       - Patient
 *     description: Reschedule appointment. Requires to be authorized.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
AppointmentRouter.put(
   '/reschedulingAppointment/:id/:date/:startTime/:endTime',
   authorize([Role.ADMIN, Role.DOCTOR, Role.PATIENT]),
   AppointmentsController.rescheduleAppointment
)

/** ~~~ Doctor: ~~~ */

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

/**
 * @openapi
 * /doctor/appointments:
 *    get:
 *       summary: get all doctor appointments
 *       tags:
 *          - Doctor
 *          - Appointments
 *       description: Get all doctor appointments. Requires Doctor authorization.
 *       security:
 *          - coockieAuth: []
 *       responses:
 *          200:
 *             description: OK
 */
AppointmentRouter.get(
   '/doctor/appointments',
   authorize(Role.DOCTOR),
   AppointmentsController.getDoctorAppointments
)
