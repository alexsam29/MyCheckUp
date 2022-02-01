import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { MainController } from '../controllers/main-controller'
import { AdminController } from '../controllers/admin-controller'
import { PatientController } from '../controllers/patient-controller'

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
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50}),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50}),
   AdminController.register)

router.get('/admin/profile',
   authorize(Role.ADMIN),
   AdminController.getSelf)


// Patient:

router.post('/patient/login',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   PatientController.login)

router.post('/patient/logout', PatientController.logout)

router.post('/patient/register',
   body('email').notEmpty().isEmail(),
   body('password').notEmpty().isLength({ min: 6, max: 50 }),
   body('firstName').notEmpty().trim().isLength({ min: 1, max: 50}),
   body('lastName').notEmpty().trim().isLength({ min: 1, max: 50}),
   body('dateOfBirth').notEmpty().trim().isLength({ min: 1, max: 50 }), 
   body('phoneNumber').optional().trim().isLength({ min: 10, max: 10 }),
   body('address').optional().trim().isLength({ min: 1, max: 50 }),
   body('healthCardNum').notEmpty().trim().isLength({min: 1, max: 50}),
   PatientController.register)

router.get('/patient/profile',
   authorize(Role.PATIENT),
   PatientController.getSelf)


router.post('/patient/edit',
body('id').notEmpty().isLength({min: 1, max: 100}),
body('email').optional().isEmail(),
body('firstName').optional().trim().isLength({ min: 0, max: 50}),
body('lastName').optional().trim().isLength({ min: 0, max: 50}),
body('phoneNumber').optional().trim().isLength({ min: 0, max: 15 }),
body('address').optional().trim().isLength({ min: 0, max: 50 }),
body('gender').optional().trim().isLength({min: 0, max: 10}),

PatientController.updateProfile)



