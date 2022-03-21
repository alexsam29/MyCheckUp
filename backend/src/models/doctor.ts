import { Entity, Column, OneToMany } from 'typeorm'
import { User } from './user'
import { Role } from './role'
import { PatientToDoctor } from './patient-to-doctor'
import { Prescription } from './prescription'
import { Availability } from './availability'
import { Appointment } from './appointment'

/**
 * Doctor database model.
 *
 * Fields:
 * - `id` - Doctor id.
 * - `firstName` - first name.
 * - `lastName` - last name.
 * - `email` - email used to log in.
 * - `password` - password used to log in.
 * - `role` - Doctor role.
 * - `license` - medical license number.
 * - `specialty` - medical specialty.
 * - `title` - job title.
 * - `phoneNumber` - phone number.
 * - `patients` - array of associated patients.
 * - `prescriptions` - array of issued prescriptions.
 * - `availabilities` - array of availabilities.
 * - `appointments` - array of associated appointments.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Doctor extends User {
   @Column({
      type: 'enum',
      enum: Role,
      default: Role.DOCTOR,
   })
   override role!: Role.DOCTOR

   @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
   })
   license!: string | null

   @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
   })
   specialty!: string | null

   @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
   })
   title!: string | null

   @Column({
      type: 'varchar',
      length: 20,
      nullable: true,
   })
   phoneNumber!: string | null

   @OneToMany(() => PatientToDoctor, patientToDoctor => patientToDoctor.doctor)
   patients!: PatientToDoctor[]

   @OneToMany(() => Prescription, prescription => prescription.doctor)
   prescriptions!: Prescription[]

   @OneToMany(() => Availability, availability => availability.doctor)
   availabilities!: Availability[]

   @OneToMany(() => Appointment, appointment => appointment.doctor)
   appointments!: Appointment[]
}
