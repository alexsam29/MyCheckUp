import express from 'express'
import { body } from 'express-validator'
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
   authorize(Role.PATIENT),
   PrescriptionController.getPatientPrescriptions
)

/**
 * @openapi
 * /doctor/prescriptions:
 *    get:
 *      summary: get all doctor prescriptions.
 *      tags:
 *          - Doctor
 *          - Prescription
 *      description: Get all doctor prescriptions.
 *      security:
 *          - cookieAuth: []
 *      responses:
 *          200:
 *              description: OK
 */
PrescriptionRouter.get(
   '/doctor/prescriptions',
   authorize(Role.DOCTOR),
   PrescriptionController.getDoctorPrescriptions
)

/**
 * @openapi
 * /prescriptions:
 *   post:
 *     summary: create new prescription
 *     tags:
 *       - Prescription
 *     description: Create prescription either as Doctor or as Patient.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
PrescriptionRouter.post(
   '/prescriptions',
   authorize([Role.DOCTOR, Role.PATIENT]),
   body('patientId').notEmpty().isUUID,
   body('doctorId').notEmpty().isUUID,
   body('description').isString().isLength({ min: 1, max: 255 }),
   body('numOfRefill').notEmpty().isInt(),
   body('expiryDate').notEmpty(),
   body('status').notEmpty(),
   body('requestedByPatient').notEmpty().isBoolean(),
   PrescriptionController.create
)
