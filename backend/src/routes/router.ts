import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { MainController } from '../controllers/main-controller'
import { AdminController } from '../controllers/admin-controller'

/**
 * Provides routing for the whole API.
 */
export const router = express.Router()

// Main:
router.get('/', MainController.root)
router.get('/ping', MainController.ping)

// Admin:
router.post('/admin/login',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   AdminController.login)

router.post('/admin/logout', AdminController.logout)

router.post('/admin/register',
   authorize(Role.ADMIN),
   AdminController.register)

router.get('/admin/profile',
   authorize(Role.ADMIN),
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50}),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50}),
   AdminController.getSelf)

// Patient:

