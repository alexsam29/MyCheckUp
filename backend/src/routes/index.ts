import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { RootRouter } from './root-router'
import { AuthRouter } from './auth-router'
import { AdminRouter } from './admin-router'
import { DoctorRouter } from './doctor-router'
import { PatientRouter } from './patient-router'
import { SymptomRouter } from './symptom-router'
import { AppointmentRouter } from './appointment-router'
import { PrescriptionRouter } from './prescription-router'

/**
 * Provides routing for the whole API.
 */
export const router = express.Router()
router.use('/', swaggerUi.serve)
router.use(RootRouter)
router.use(AuthRouter)
router.use(AdminRouter)
router.use(DoctorRouter)
router.use(PatientRouter)
router.use(SymptomRouter)
router.use(AppointmentRouter)
router.use(PrescriptionRouter)
