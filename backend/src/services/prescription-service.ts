import { getRepository } from 'typeorm'
import { Prescription } from '../models/prescription'
import { PrescriptionStatus } from '../models/prescription-status'
import { SearchQuery } from './utils/search-query'
import { PatientService } from './patient-service'
import { DoctorService } from './doctor-service'
import { ApiError } from '../exceptions/api-error'

/**
 * Handles business logic for `Prescription` model.
 */
export const PrescriptionService = {
   /**
    * @param dto New prescription information.
    * @returns Created prescription.
    */
   async create(dto: {
      patientId: string
      doctorId: string
      description: string
      numOfRefill: number
      expiryDate: Date
      status: PrescriptionStatus
      requestedByPatient: boolean
   }): Promise<Prescription> {
      const [patient, doctor] = await Promise.all([
         PatientService.findOne({ id: dto.patientId }),
         DoctorService.findOne({ id: dto.doctorId }),
      ])

      if (!patient) {
         throw ApiError.NotFound('Patient not found')
      }
      if (!doctor) {
         throw ApiError.NotFound('Doctor not found')
      }

      const presc = new Prescription()
      presc.description = dto.description
      presc.numOfRefill = dto.numOfRefill
      presc.expiryDate = dto.expiryDate
      presc.status = dto.status
      presc.requestedByPatient = dto.requestedByPatient
      presc.patient = patient
      presc.doctor = doctor

      return getRepository(Prescription).save(presc)
   },

   /**
    * @param dto Prescription id and updated information.
    * @returns Updated prescription.
    */
   async update(dto: {
      id: string
      description?: string
      numOfRefill?: number
      expiryDate?: Date
      status?: PrescriptionStatus
      requestedByPatient?: boolean
   }): Promise<Prescription> {
      const presc = await getRepository(Prescription).findOne(dto.id)

      if (!presc) {
         throw ApiError.NotFound('Prescription not found')
      }

      if (dto.description) presc.description = dto.description
      if (dto.numOfRefill) presc.numOfRefill = dto.numOfRefill
      if (dto.expiryDate) presc.expiryDate = dto.expiryDate
      if (dto.status) presc.status = dto.status
      if (dto.requestedByPatient) presc.requestedByPatient = dto.requestedByPatient

      return getRepository(Prescription).save(presc)
   },

   /**
    * Find prescriptions in the database that match given conditions.
    *
    * @param searchBy Search condition (optional).
    * @param exact Matches exactly if true (optional, defaul false).
    * @param offset Search offset (optional).
    * @param limit Maximum number of accounts to be returned (optional, default 100).
    * @returns Array of found prescriptions.
    */
   async find(
      searchBy?: {
         patientId?: string
         doctorId?: string
         description?: string
         numOfRefill?: number
         expiryDate?: Date
         status?: PrescriptionStatus
         requestedByPatient?: boolean
      },
      options?: SearchQuery
   ): Promise<Prescription[]> {
      const prescriptions = await getRepository(Prescription).find({
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: options?.offset,
         take: options?.limit,
      })

      if (!prescriptions || !prescriptions.length) {
         throw ApiError.NotFound('No prescriptions were found')
      }

      return prescriptions
   },

   /**
    * @param id Prescription id.
    * @returns Found prescription.
    */
   async findById(id: string): Promise<Prescription> {
      const presc = await getRepository(Prescription).findOne(id)

      if (!presc) {
         throw ApiError.NotFound('Prescription not found')
      }

      return presc
   },

   /**
    * @param patientId Associated patient id.
    * @param doctorId Associated doctor id.
    * @returns Found prescription.
    */
   async findByPatientDoctor(
      patientId: string,
      doctorId: string
   ): Promise<Prescription> {
      const presc = await getRepository(Prescription).findOne({
         patientId,
         doctorId,
      })

      if (!presc) {
         throw ApiError.NotFound('Prescription not found')
      }

      return presc
   },

   /**
    * @param id Prescription id.
    * @returns Removed prescription.
    */
   async remove(id: string): Promise<Prescription> {
      const presc = await getRepository(Prescription).findOne(id)

      if (!presc) {
         throw ApiError.NotFound('Prescription not found')
      }

      return getRepository(Prescription).remove(presc)
   },
}
