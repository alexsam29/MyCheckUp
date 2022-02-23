import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne
} from 'typeorm'
import { Doctor } from './doctor'
import { WeekDay } from './week-day'



/**
 * Availability database model. Represents doctor's availability for the day.
 * 
 * Fields:
 * - `id` - availability id.
 * - `doctorId` - doctor id.
 * - `weekDay` - availability week day.
 * - `availableFrom` - time available from in minutes after midnight (0-1440).
 * - `availableTo` - time available to in minutes after midnight (0-1440).
 * - `appointmentDuration` - standard length of a single appointment in minutes (0-60).
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

   @Column({ type: 'enum', enum: WeekDay })
   weekDay!: WeekDay

   @Column('integer')
   availableFrom!: number

   @Column('integer')
   availableTo!: number

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
