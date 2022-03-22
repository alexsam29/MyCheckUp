import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   OneToOne,
   JoinColumn,
} from 'typeorm'
import { AppointmentStatus } from './appointment-status'
import { Patient } from './patient'
import { Doctor } from './doctor'
import { SelfAssessment } from './self-assessment'

/**
 * Appointment database model.
 *
 * Fields:
 * - `id` - appointment id.
 * - `patientId` - patient id.
 * - `doctorId` - doctor id.
 * - `date` - appointment date.
 * - `startTime` - appointment start time.
 * - `endTime` - appointment end time.
 * - `status` - appointment status.
 * - `doctorNotes` - appointment notes made by doctor.
 * - `patient` - associated `Patient` object.
 * - `doctor` - associated `Doctor` object.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Appointment {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column()
   patientId!: string

   @Column()
   doctorId!: string

   @Column({ nullable: true })
   selfAssessmentId!: string | null

   @Column('date')
   date!: Date

   @Column({ type: 'time', nullable: false })
   startTime!: string

   @Column({ type: 'time', nullable: false })
   endTime!: string

   @Column({
      type: 'enum',
      enum: AppointmentStatus,
      default: AppointmentStatus.PENDING,
   })
   status!: AppointmentStatus

   @Column({ type: 'text', nullable: true })
   doctorNotes!: string | null

   @ManyToOne(() => Patient, patient => patient.appointments, {
      onDelete: 'CASCADE',
   })
   patient!: Patient

   @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'SET NULL' })
   doctor!: Doctor

   @OneToOne(() => SelfAssessment, { onDelete: 'SET NULL', eager: true })
   @JoinColumn()
   selfAssessment!: SelfAssessment

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
