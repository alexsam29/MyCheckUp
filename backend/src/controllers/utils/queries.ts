import { PrescriptionStatus } from '../../models/prescription-status'
import { Pagination } from './pagination'

export interface GetDoctorPrescriptionsQuery extends Pagination {
   status?: PrescriptionStatus
   patientId?: string
}
