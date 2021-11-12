import {
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn
} from 'typeorm'
import { Role } from './role'

/**
 * User abstract model.
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

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
