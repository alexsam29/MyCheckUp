import {
   Entity,
   Column,
   PrimaryColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
} from 'typeorm'
import { Patient } from './patient'
import { Doctor } from './doctor'

/**
 * Bridge entity for `Patient` and `Doctor` models.
 *
 * `Patient` : `Doctor` = M : N
 *
 * Fields:
 * - `patientId` - Patient id.
 * - `doctorId` - Doctor id.
 * - `active` - the state of the formal relationship between Patient and Doctor.
 * - `startDate` - start date of the formal relationship between Patient and Doctor.
 * - `endDate` - end date of the formal relationship between Patient and Doctor.
 * - `patient` - associated patient.
 * - `doctor` - associated doctor.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class PatientToDoctor {
   @PrimaryColumn()
   patientId!: string

   @PrimaryColumn()
   doctorId!: string

   @Column('bool')
   active!: boolean

   @Column('date')
   startDate!: Date

   @Column({ type: 'date', nullable: true })
   endDate!: Date | null

   @ManyToOne(() => Patient, patient => patient.doctors, { onDelete: 'CASCADE' })
   patient!: Patient

   @ManyToOne(() => Doctor, doctor => doctor.patients, { onDelete: 'CASCADE' })
   doctor!: Doctor

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
