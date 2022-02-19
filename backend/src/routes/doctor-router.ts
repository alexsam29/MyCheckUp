import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { DoctorController } from '../controllers/doctor-controller'


export const DoctorRouter = express.Router()


DoctorRouter.post('/doctor/login',
   body('email').isEmail(),
   body('password').isLength({ min: 6, max: 50 }),
   DoctorController.login)

DoctorRouter.post('/doctor/logout', DoctorController.logout)

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
DoctorRouter.post('/doctor/register',
   body('email').isEmail(),
   body('password').isLength({ min: 6, max: 50 }),
   body('firstName').trim().isLength({ min: 1, max: 50}),
   body('lastName').trim().isLength({ min: 1, max: 50}),
   body('license').optional().trim().isLength({ min: 1, max: 100 }),
   body('specialty').optional().trim().isLength({ min: 1, max: 100 }),
   body('title').optional().trim().isLength({ min: 1, max: 100 }),
   body('phoneNumber').optional().trim().isLength({ min: 10, max: 20 }),
   DoctorController.register)

/**
 * @openapi
 * /doctor/profile:
 *   get:
 *     summary: get doctor profile info
 *     tags:
 *       - Doctor
 *     description: Get profile of currently logged in Doctor.
 *     responses:
 *       200:
 *         description: OK
 */
DoctorRouter.get('/doctor/profile',
   authorize(Role.DOCTOR),
   DoctorController.getSelf)
