import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
} from 'typeorm'
import { Patient } from './patient'
import { Doctor } from './doctor'
import { PStatus } from './prescription_enum'

/**
 * Patient prescription database model.
 *
 * Fields:
 * - `id` - prescription id.
 * - `patientId` - patient id.
 * - `doctorId` - doctor id.
 * - `description` - description of prescribed medicaments.
 * - `numOfRefill` - number of times they can get the drug.
 * - `expiryDate` - date of expiry.
 * - `patient` - associated patient object.
 * - `doctor` - associated doctor object.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Prescription {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column()
   patientId!: string

   @Column()
   doctorId!: string

   @Column()
   description!: string

   @Column()
   numOfRefill!: number

   @Column()
   expiryDate!: Date

   @Column({
      type: 'enum',
      enum: PStatus,
   })
   status!: PStatus

   @Column()
   RequestedBy!: Boolean

   @ManyToOne(() => Patient, patient => patient.prescriptions, {
      onDelete: 'CASCADE',
   })
   patient!: Patient

   @ManyToOne(() => Doctor, doctor => doctor.prescriptions, { onDelete: 'SET NULL' })
   doctor!: Doctor

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
