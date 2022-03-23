import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
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
 * - `availableFrom` - time available from as hh:mm:ss string.
 * - `availableTo` - time available to as hh:mm:ss string.
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

   @Column({ type: 'bool', default: false })
   isAvailable!: boolean

   @Column({ type: 'time', nullable: true })
   availableFrom!: string | null

   @Column({ type: 'time', nullable: true })
   availableTo!: string | null

   @Column({ type: 'integer', default: 0 })
   appointmentDuration!: number

   @ManyToOne(() => Doctor, doctor => doctor.availabilities, { onDelete: 'CASCADE' })
   doctor!: Doctor

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
