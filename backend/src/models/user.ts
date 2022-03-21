import {
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm'
import { Role } from './role'

/**
 * User abstract model.
 *
 * Fields:
 * - `id` - id.
 * - `firstName` - first name.
 * - `lastName` - last name.
 * - `email` - email used to log in.
 * - `password` - password used to log in.
 * - `role` - role.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
export abstract class User {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column({ length: 255, unique: true })
   email!: string

   @Column({ length: 255 })
   password!: string

   @Column({ length: 50 })
   firstName!: string

   @Column({ length: 50 })
   lastName!: string

   @Column({ type: 'enum', enum: Role })
   role!: Role

   @Column({ type: 'boolean', default: false })
   active!: boolean

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
