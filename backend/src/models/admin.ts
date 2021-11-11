import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn
} from 'typeorm'
import { Role } from './role'

/**
 * Admin database model.
 * 
 * Fields:
 * - `id`
 * - `firstName`
 * - `lastName`
 * - `email`
 * - `password`
 * - `role`
 * - `createdAt`
 * - `updatedAt`
 */
@Entity()
export class Admin {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column({ length: 50 })
   firstName!: string

   @Column({ length: 50 })
   lastName!: string

   @Column({ length: 255, unique: true })
   email!: string

   @Column({ length: 255 })
   password!: string

   @Column({
      type: 'enum',
      enum: Role,
      default: Role.ADMIN
   })
   role!: Role.ADMIN

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
