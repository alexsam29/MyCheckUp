import { getRepository } from 'typeorm'
import { SelfAssessment } from '../models/self-assessment'
import { SymptomService } from './symptom-service'
import { ApiError } from '../exceptions/api-error'
import { AppointmentService } from './appointment-service'

export const SelfAssessmentService = {
   /**
    * @returns All self-assesments (for testing purposes only).
    */
   async findAll(): Promise<SelfAssessment[]> {
      const assessments = await getRepository(SelfAssessment).find()
      if (!assessments || assessments.length === 0) {
         throw ApiError.NotFound('No self-assessments found')
      }

      return assessments
   },

   /**
    * @param id Self-assessment id.
    * @returns Found self-assessment.
    */
   async findOneById(id: string): Promise<SelfAssessment> {
      const assessment = await getRepository(SelfAssessment).findOne(id)
      if (!assessment) {
         throw ApiError.NotFound('Self-assessment not found')
      }

      return assessment
   },

   /**
    * @param notes Assessment notes.
    * @param symptomIds Array of symptom ids.
    * @param appointmentId Associated appointment id.
    * @returns Created self-assessment.
    */
   async create(
      notes: string,
      symptomIds: string[],
      appointmentId: string
   ): Promise<SelfAssessment> {
      const assessment = new SelfAssessment()
      assessment.notes = notes
      if (symptomIds.length > 0) {
         const symptoms = await SymptomService.findAllById(symptomIds)
         assessment.symptoms = symptoms
      }

      const createdAssessment = await getRepository(SelfAssessment).save(assessment)
      await AppointmentService.setSelfAssessment(appointmentId, createdAssessment)

      return createdAssessment
   },

   /**
    * @param id Id of self-assessment to be removed.
    * @returns Deleted self-assessment.
    */
   async remove(id: string): Promise<SelfAssessment> {
      const repository = getRepository(SelfAssessment)

      const assessment = await repository.findOne(id)
      if (!assessment) {
         throw ApiError.NotFound('Self-assessment not found')
      }

      await repository.remove(assessment)

      return assessment
   },
}
