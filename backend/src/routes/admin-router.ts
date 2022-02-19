import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { AdminController } from '../controllers/admin-controller'


export const AdminRouter = express.Router()


AdminRouter.post('/admin/login',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   AdminController.login)


AdminRouter.post('/admin/logout', AdminController.logout)

/**
 * @openapi
 * /admin/register:
 *   post:
 *     summary: register admin
 *     tags:
 *       - Admin
 *     description: Register Admin account. Can only be done by another Admin.
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.post('/admin/register',
   authorize(Role.ADMIN),
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50}),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50}),
   AdminController.register)


/**
 * @openapi
 * /admin/profile:
 *   get:
 *     summary: get admin profile info
 *     tags:
 *       - Admin
 *     description: Get profile of currently logged in Admin.
 *     responses:
 *       200:
 *         description: OK
 */
AdminRouter.get('/admin/profile',
   authorize(Role.ADMIN),
   AdminController.getSelf)
