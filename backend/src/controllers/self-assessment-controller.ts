import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { SelfAssessmentService } from '../services/self-assessment-service'
import { ApiError } from '../exceptions/api-error'

export const SelfAssessmentController = {
   /**
    * Finds all self-assessments.
    *
    * @testOnly
    */
   async getAll(_: Request, res: Response, next: NextFunction) {
      try {
         const assessments = await SelfAssessmentService.findAll()
         return res.status(200).json(assessments)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Finds self-assessment by id.
    */
   async getOneById(req: Request, res: Response, next: NextFunction) {
      try {
         const assessment = await SelfAssessmentService.findOneById(
            req.params.assessmentId
         )
         return res.status(200).json(assessment)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Creates new self-assessment.
    */
   async create(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const assessment = await SelfAssessmentService.create(
            req.body.notes,
            req.body.symptomIds,
            req.params.appointmentId
         )

         return res.status(200).json(assessment)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Deletes self-assessment.
    */
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const assessment = await SelfAssessmentService.remove(
            req.params.assessmentId
         )
         return res.status(200).json(assessment)
      } catch (error: unknown) {
         return next(error)
      }
   },
}
