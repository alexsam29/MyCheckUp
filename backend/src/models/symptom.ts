import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm'

/**
 * Symptom database model.
 *
 * Fields:
 * - `id` - symptom id.
 * - `description` - short description of the symptom (i.e. fever, runny nose).
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class Symptom {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Column({ length: 255 })
   description!: string

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
