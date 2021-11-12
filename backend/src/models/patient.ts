import { Entity, Column, OneToMany } from 'typeorm'
import { User } from './user'
import { Role } from './role'
import { PatientToDoctor } from './patient-to-doctor'

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
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Patient extends User {
   @Column({
      type: 'enum',
      enum: Role,
      default: Role.PATIENT
   })
   override role!: Role.PATIENT

   @Column({ type: 'date' })
   dateOfBirth!: Date

   @OneToMany(() => PatientToDoctor, patientToDoctor => patientToDoctor.patient)
   doctors!: PatientToDoctor[]
}
