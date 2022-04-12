import express from 'express'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { PrescriptionController } from '../controllers/prescription-controller'

export const PrescriptionRouter = express.Router()

/** ~~~ Prescription ~~~ **/

/**
 * @openapi
 * /patient/prescriptions:
 *    get:
 *      summary: get all patient prescriptions.
 *      tags:
 *          - Patient
 *          - Prescription
 *      description: Get patient prescription.
 *      security:
 *          - cookieAuth: []
 *      responses:
 *          200:
 *              description: OK
 */
PrescriptionRouter.get(
   '/patient/prescriptions',
   authorize([Role.PATIENT, Role.DOCTOR, Role.ADMIN]),
   PrescriptionController.getPatientPrescription
)
