import { getRepository } from 'typeorm'
import { Symptom } from '../models/symptom'
import { ApiError } from '../exceptions/api-error'

export const SymptomService = {
   /**
    * @returns All symptoms.
    */
   async find(): Promise<Symptom[]> {
      const symptoms = await getRepository(Symptom).find()
      if (!symptoms || symptoms.length === 0) {
         throw ApiError.NotFound('No symptoms found')
      }

      return symptoms
   },

   /**
    * @param id Symptom id.
    * @returns Found symptom.
    */
   async findById(id: string): Promise<Symptom> {
      const symptom = await getRepository(Symptom).findOne(id)
      if (!symptom) {
         throw ApiError.NotFound('Symptom not found')
      }

      return symptom
   },

   /**
    * @param desciption Description of the new symptom.
    * @returns Created symptom.
    */
   async create(desciption: string): Promise<Symptom> {
      const symptom = new Symptom()
      symptom.description = desciption

      return getRepository(Symptom).save(symptom)
   },

   /**
    * @param id Symptom id.
    * @param desciption Updated description of the symptom.
    * @returns Updated symptom.
    */
   async update(id: string, description: string): Promise<Symptom> {
      const repository = getRepository(Symptom)

      const symptom = await repository.findOne(id)
      if (!symptom) {
         throw ApiError.NotFound('Symptom not found')
      }

      symptom.description = description

      return repository.save(symptom)
   },

   /**
    * @param id Symptom id.
    * @returns Deleted symptom.
    */
   async remove(id: string): Promise<Symptom> {
      const repository = getRepository(Symptom)

      const symptom = await repository.findOne(id)
      if (!symptom) {
         throw ApiError.NotFound('Symptom not found')
      }

      await repository.remove(symptom)

      return symptom
   },
}
