import { ApiError } from '../exceptions/api-error'
import { Prescription } from '../models/prescription'
import { getRepository } from 'typeorm'

export const PrescriptionService = {
   async findPrescription(
      searchBy?: { patientId?: string },
      offset = 0,
      limit = 100
   ): Promise<Prescription[]> {
      const repository = getRepository(Prescription)

      const prescription = await repository.find({
         select: [
            'id',
            'patientId',
            'doctorId',
            'description',
            'numOfRefill',
            'expiryDate',
            'status',
            'RequestedBy',
         ],
         where: searchBy,
         skip: offset,
         take: limit,
      })

      if (!prescription)
         throw ApiError.NotFound('No prescription found for this patient!')

      return prescription
   },
}
