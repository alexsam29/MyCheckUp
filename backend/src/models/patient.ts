import { Entity, Column, OneToMany } from 'typeorm'
import { User } from './user'
import { Role } from './role'
import { PatientToDoctor } from './patient-to-doctor'
import { Prescription } from './prescription'
import { Appointment } from './appointment'

/**
 * Patient database model.
 *
 * Fields:
 * - `id` - Patient id.
 * - `firstName` - first name.
 * - `lastName` - last name.
 * - `email` - email used to log in.
 * - `password` - password used to log in.
 * - `role` - Patient role.
 * - `dateOfBirth` - date of birth.
 * - `gender` - gender.
 * - `phoneNumber` - phone number.
 * - `address` - address.
 * - `healthCardNum` - health card number.
 * - `doctors` - array of associated doctors.
 * - `prescriptions` - array of received prescriptions.
 * - `appointments` - array of initiated appointments.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Patient extends User {
   @Column({
      type: 'enum',
      enum: Role,
      default: Role.PATIENT,
   })
   override role!: Role.PATIENT

   @Column({ type: 'date' })
   dateOfBirth!: Date

   @Column({
      type: 'varchar',
      length: 7,
      nullable: true,
   })
   gender!: string | null

   @Column({
      type: 'varchar',
      length: 20,
      nullable: true,
   })
   phoneNumber!: string | null

   @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
   })
   address!: string | null

   @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
   })
   healthCardNum!: string | null

   @OneToMany(() => PatientToDoctor, patientToDoctor => patientToDoctor.patient)
   doctors!: PatientToDoctor[]

   @OneToMany(() => Prescription, prescription => prescription.patient)
   prescriptions!: Prescription[]

   @OneToMany(() => Appointment, appointment => appointment.patient)
   appointments!: Appointment[]
}
