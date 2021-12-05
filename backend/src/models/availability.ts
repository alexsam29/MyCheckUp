import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne
} from 'typeorm'
import { Doctor } from './doctor'

/**
 * Availability database model. Represents doctor's availability for the day.
 * 
 * Fields:
 * - `id` - availability id.
 * - `doctorId` - doctor id.
 * - `date` - availability date.
 * - `availableFrom` - time available from.
 * - `availableTo` - time available to.
 * - `appointmentDuration` - standard length of a single appointment.
 * - `doctor` - associated doctor.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Availability {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column()
   doctorId!: string

   @Column('date')
   date!: Date

   @Column('time')
   availableFrom!: Date

   @Column('time')
   availableTo!: Date

   @Column('integer')
   appointmentDuration!: number

   @ManyToOne(
      () => Doctor, doctor => doctor.availabilities,
      { onDelete: 'CASCADE' }
   )
   doctor!: Doctor

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
