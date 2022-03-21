import { Entity, Column } from 'typeorm'
import { User } from './user'
import { Role } from './role'

/**
 * Admin database model.
 *
 * Fields:
 * - `id` - Admin id.
 * - `firstName` - first name.
 * - `lastName` - last name.
 * - `email` - email used to log in.
 * - `password` - password used to log in.
 * - `role` - Admin role.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Admin extends User {
   @Column({
      type: 'enum',
      enum: Role,
      default: Role.ADMIN,
   })
   override role!: Role.ADMIN
}
