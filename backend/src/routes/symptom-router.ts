import express from 'express'
import { body } from 'express-validator'
import { authorize } from '../middleware/authorize'
import { Role } from '../models/role'
import { SymptomController } from '../controllers/symptom-controller'

export const SymptomRouter = express.Router()

/**
 * @openapi
 * /symptoms:
 *   get:
 *     summary: get all symptoms
 *     tags:
 *       - Symptom
 *     description: Get all symptoms. Requires to be authenticated.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
SymptomRouter.get('/symptoms', authorize(), SymptomController.getAll)

/**
 * @openapi
 * /symptoms:
 *   post:
 *     summary: create new symptom
 *     tags:
 *       - Symptom
 *     description: Create new symptom. Requires Admin authorization.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: object with symptom description
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: symptom description
 *                 example: cough
 *     responses:
 *       200:
 *         description: OK
 */
SymptomRouter.post(
   '/symptoms',
   authorize(Role.ADMIN),
   body('description')
      .isString()
      .isLength({ min: 1, max: 255 })
      .trim()
      .withMessage('description must be a string between 1 and 255 characters'),
   SymptomController.create
)

/**
 * @openapi
 * /symptoms/{symptomId}:
 *   get:
 *     summary: get symptom by id
 *     tags:
 *       - Symptom
 *     description: Get symptom by id. Requires to be authenticated.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: symptomId
 *         schema:
 *           type: string
 *         required: true
 *         description: symptom uuid string
 *     responses:
 *       200:
 *         description: OK
 */
SymptomRouter.get('/symptoms/:symptomId', authorize(), SymptomController.getOneById)

/**
 * @openapi
 * /symptoms/{symptomId}:
 *   put:
 *     summary: update symptom by id
 *     tags:
 *       - Symptom
 *     description: Update existing symptom by id. Requires Admin authorization.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: symptomId
 *         schema:
 *           type: string
 *         required: true
 *         description: symptom uuid string
 *     requestBody:
 *       description: object with symptom description
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: symptom description
 *                 example: cough
 *     responses:
 *       200:
 *         description: OK
 */
SymptomRouter.put(
   '/symptoms/:symptomId',
   authorize(Role.ADMIN),
   body('description')
      .isString()
      .isLength({ min: 1, max: 255 })
      .trim()
      .withMessage('description must be a string between 1 and 255 characters'),
   SymptomController.update
)

/**
 * @openapi
 * /symptoms/{symptomId}:
 *   delete:
 *     summary: delete symptom by id
 *     tags:
 *       - Symptom
 *     description: Delete symptom by id. Requires Admin authorization.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: symptomId
 *         schema:
 *           type: string
 *         required: true
 *         description: symptom uuid string
 *     responses:
 *       200:
 *         description: OK
 */
SymptomRouter.delete(
   '/symptoms/:symptomId',
   authorize(Role.ADMIN),
   SymptomController.delete
)
