import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { DoctorController } from '../controllers/doctor-controller'

export const DoctorRouter = express.Router()

/**
 * @openapi
 * /doctors:
 *   get:
 *     summary: get all active doctor profiles
 *     tags:
 *       - Doctor
 *     description: Get all active Doctor profiles. Can be done by any User.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get(
   '/doctors',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   DoctorController.getAll
)

/**
 * @openapi
 * /doctors/{doctorId}:
 *   get:
 *     summary: get doctor profile by id
 *     tags:
 *       - Doctor
 *     description: Get doctor profile by id. Can be done by any User.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get(
   '/doctors/:doctorId',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   DoctorController.getOneById
)

/**
 * @openapi
 * /doctors/{doctorId}/availability:
 *   get:
 *     summary: get doctor's availability for the whole week
 *     tags:
 *       - Doctor
 *     description: Get Doctor's availability for the whole week. Can be done by any User.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get(
   '/doctors/:doctorId/availability',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   DoctorController.getFullAvailability
)

/**
 * @openapi
 * /doctors/{doctorId}/availability/${weekDay}:
 *   get:
 *     summary: get doctor's availability for the selected week day
 *     tags:
 *       - Doctor
 *     description: Get Doctor's availability for the selected week day. Can be done by any User.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get(
   '/doctors/:doctorId/availability/:weekDay',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   DoctorController.getAvailabilityByDay
)

/**
 * @openapi
 * /doctor/register:
 *   post:
 *     summary: register doctor
 *     tags:
 *       - Doctor
 *     description: Register doctor account. Account will be inactive until approved.
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.post(
   '/doctor/register',
   body('email').isEmail(),
   body('password').isLength({ min: 6, max: 50 }),
   body('firstName').trim().isLength({ min: 1, max: 50 }),
   body('lastName').trim().isLength({ min: 1, max: 50 }),
   body('license').optional().trim().isLength({ min: 1, max: 100 }),
   body('specialty').optional().trim().isLength({ min: 1, max: 100 }),
   body('title').optional().trim().isLength({ min: 1, max: 100 }),
   body('phoneNumber').optional().trim().isLength({ min: 10, max: 20 }),
   DoctorController.register
)

/**
 * @openapi
 * /doctor/profile:
 *   get:
 *     summary: get doctor profile info
 *     tags:
 *       - Doctor
 *     description: Get profile of currently logged in Doctor.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get('/doctor/profile', authorize(Role.DOCTOR), DoctorController.getSelf)

/**
 * @openapi
 * /doctor/availability/{weekDay}:
 *   put:
 *     summary: set doctor availability for the week day
 *     tags:
 *       - Doctor
 *     description: Set Doctor availability for the selected week day. I.e, for Monday. Can only be done by the Doctor.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.put(
   '/doctor/availability/:weekDay',
   authorize(Role.DOCTOR),
   body('isAvailable').isBoolean(),
   body('availableFrom')
      .optional({ nullable: true })
      .isString()
      .matches(/^\d\d:\d\d:\d\d$/)
      .withMessage('Must be a string in hh:mm:ss format'),
   body('availableTo')
      .optional({ nullable: true })
      .isString()
      .matches(/^\d\d:\d\d:\d\d$/)
      .withMessage('Must be a string in hh:mm:ss format'),
   body('appointmentDuration')
      .optional()
      .isNumeric({ no_symbols: true })
      .withMessage('Must be an integer in the range [0-6]'),
   DoctorController.setAvailability
)
