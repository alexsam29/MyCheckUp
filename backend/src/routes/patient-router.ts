import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { PatientController } from '../controllers/patient-controller'

export const PatientRouter = express.Router()

/**
 * @openapi
 * /patient/register:
 *   post:
 *     summary: register patient
 *     tags:
 *       - Patient
 *     description: Register Patient account.
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request (i.e., email is already used)
 */
PatientRouter.post(
   '/patient/register',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50 }),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50 }),
   body('dateOfBirth').notEmpty().trim().isLength({ min: 1, max: 50 }),
   body('phoneNumber').optional().trim().isLength({ min: 10, max: 13 }),
   body('address').optional().trim().isLength({ min: 1, max: 50 }),
   body('healthCardNum').notEmpty().trim().isLength({ min: 1, max: 50 }),
   body('gender').notEmpty().trim().isLength({ min: 1, max: 7 }),
   PatientController.register
)

/**
 * @openapi
 * /patient/profile:
 *   get:
 *     summary: get patient profile info
 *     tags:
 *       - Patient
 *     description: Get profile of currently logged in Patient.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
PatientRouter.get(
   '/patient/profile',
   authorize(Role.PATIENT),
   PatientController.getSelf
)

/**
 * @openapi
 * /patient/edit:
 *   put:
 *     summary: update patient profile
 *     tags:
 *       - Patient
 *     description: Update Patient profile.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
PatientRouter.put(
   '/patient/edit',
   body('id').notEmpty().isLength({ min: 1, max: 100 }),
   body('email').optional().isEmail(),
   body('firstName').optional().trim().isLength({ min: 0, max: 50 }),
   body('lastName').optional().trim().isLength({ min: 0, max: 50 }),
   body('phoneNumber').optional().trim().isLength({ min: 0, max: 15 }),
   body('address').optional().trim().isLength({ min: 0, max: 50 }),
   body('gender').optional().trim().isLength({ min: 0, max: 7 }),
   PatientController.updateProfile
)

/**
 * @openapi
 * /patient/password:
 *   put:
 *     summary: update patient password
 *     tags:
 *       - Patient
 *     description: Update Patient's password.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
PatientRouter.put(
   '/patient/password',
   body('id').notEmpty().isLength({ min: 1, max: 100 }),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   PatientController.updatecredentials
)
