import express from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/auth-controller'


export const AuthRouter = express.Router()

/**
 * @openapi
 *   /auth/login:
 *     post:
 *       summary: login
 *       tags:
 *         - Auth
 *       description: Login.
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema: 
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: true if login was successful
 *         400:
 *           description: Bad request
 *         404:
 *           description: Account not found / incorrect credentials
 */
AuthRouter.post('/auth/login',
   body('role').isLength({ min: 4, max: 10 }).withMessage('Invalid role'),
   body('email').isEmail(),
   body('password').isLength({ min: 6, max: 50 }),
   AuthController.login)

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: logout
 *     tags:
 *       - Auth
 *     description: Logout and remove session cookie.
 *     responses:
 *       200:
 *         description: OK
 */
AuthRouter.post('/auth/logout', AuthController.logout)
