import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { RootRouter } from './root-router'
import { AdminRouter } from './admin-router'
import { DoctorRouter } from './doctor-router'
import { PatientRouter } from './patient-router'


/**
 * Provides routing for the whole API.
 */
export const router = express.Router()
router.use('/', swaggerUi.serve)
router.use(RootRouter)
router.use(AdminRouter)
router.use(DoctorRouter)
router.use(PatientRouter)
