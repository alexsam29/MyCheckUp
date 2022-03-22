import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { SymptomService } from '../services/symptom-service'
import { ApiError } from '../exceptions/api-error'

export const SymptomController = {
   /**
    * Finds all symptoms.
    */
   async getAll(_: Request, res: Response, next: NextFunction) {
      try {
         const symptoms = await SymptomService.findAll()
         return res.status(200).json(symptoms)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Finds symptom by id.
    */
   async getOneById(req: Request, res: Response, next: NextFunction) {
      try {
         const symptom = await SymptomService.findOneById(req.params.symptomId)
         return res.status(200).json(symptom)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Creates new symptom.
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

         const symptom = await SymptomService.create(req.body.description)

         return res.status(200).json(symptom)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Updates existing symptom.
    */
   async update(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            throw ApiError.BadRequest(
               'Invalid data in the request body',
               errors.array()
            )
         }

         const symptom = await SymptomService.update(
            req.params.symptomId,
            req.body.description
         )

         return res.status(200).json(symptom)
      } catch (error: unknown) {
         return next(error)
      }
   },

   /**
    * Deletes symptom.
    */
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const symptom = await SymptomService.remove(req.params.symptomId)
         return res.status(200).json(symptom)
      } catch (error: unknown) {
         return next(error)
      }
   },
}
