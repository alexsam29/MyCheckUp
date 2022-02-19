import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { DoctorController } from '../controllers/doctor-controller'


export const DoctorRouter = express.Router()


DoctorRouter.post('/doctor/login',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   DoctorController.login)

DoctorRouter.post('/doctor/logout', DoctorController.logout)

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
