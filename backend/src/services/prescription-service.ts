import { getRepository } from 'typeorm'
import { Prescription } from '../models/prescription'
import { PrescriptionStatus } from '../models/prescription-status'
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
      patientId: string,
      doctorId: string,
      description: string,
      numOfRefill: number,
      expiryDate: Date,
      status: PrescriptionStatus,
      requestedByPatient: boolean
   }): Promise<Prescription> {
      const [patient, doctor] = await Promise.all([
         PatientService.findOne({ id: dto.patientId }),
         DoctorService.findOne({ id: dto.doctorId})
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

   async update(dto: {
      id: string,
      description?: string,
      numOfRefill?: number,
      expiryDate?: Date,
      status?: PrescriptionStatus,
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

   async find() {
      
   },

   async findOne() {

   },

   async remove(id: string): Promise<Prescription> {
      const presc = await getRepository(Prescription).findOne(id)

      if (!presc) {
         throw ApiError.NotFound('Prescription not found')
      }

      return getRepository(Prescription).remove(presc)
   }
}
