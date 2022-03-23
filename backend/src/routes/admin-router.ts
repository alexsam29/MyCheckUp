import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { AdminController } from '../controllers/admin-controller'

export const AdminRouter = express.Router()

/**
 * @openapi
 * /admin/register:
 *   post:
 *     summary: register admin
 *     tags:
 *       - Admin
 *     description: Register Admin account. Can only be done by another Admin.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.post(
   '/admin/register',
   authorize(Role.ADMIN),
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50 }),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50 }),
   AdminController.register
)

/**
 * @openapi
 * /admin/profile:
 *   get:
 *     summary: get admin profile info
 *     tags:
 *       - Admin
 *     description: Get profile of currently logged in Admin.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.get('/admin/profile', authorize(Role.ADMIN), AdminController.getSelf)

/**
 * @openapi
 * /admin/doctors:
 *   get:
 *     summary: get doctor accounts
 *     tags:
 *       - Admin
 *     description: Get doctor accounts information as an Admin.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.get('/admin/doctors', authorize(Role.ADMIN), AdminController.getDoctors)

/**
 * @openapi
 * /admin/doctors/{doctorId}/activate:
 *   put:
 *     summary: activate doctor account
 *     tags:
 *       - Admin
 *     description: Activate Doctor account as an Admin.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id of the doctor to activate
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.put(
   '/admin/doctors/:doctorId/activate',
   authorize(Role.ADMIN),
   AdminController.activateDoctorById
)

/**
 * @openapi
 * /admin/doctors/{doctorId}/deactivate:
 *   put:
 *     summary: deactivate doctor account
 *     tags:
 *       - Admin
 *     description: Deactivate Doctor account as an Admin.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id of the doctor to deactivate
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.put(
   '/admin/doctors/:doctorId/deactivate',
   authorize(Role.ADMIN),
   AdminController.deactivateDoctorById
)

/**
 * @openapi
 * /admin/doctors/{doctorId}:
 *   delete:
 *     summary: delete doctor account
 *     tags:
 *       - Admin
 *     description: Delete Doctor account as an Admin.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id of the doctor to delete
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.delete(
   '/admin/doctors/:doctorId',
   authorize(Role.ADMIN),
   AdminController.deleteDoctorById
)
