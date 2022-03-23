import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToMany,
   JoinTable,
} from 'typeorm'
import { Symptom } from './symptom'

/**
 * Self Assessment database model.
 *
 * Fields:
 * - `id` - self assessment id.
 * - `symptoms` - array of symptoms experienced by patient.
 * - `notes` - notes added by patient.
 * - `createdAt` - creation date in the database.
 * - `updatedAt` - last modified date in the database.
 */
@Entity()
export class SelfAssessment {
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @ManyToMany(() => Symptom, { eager: true })
   @JoinTable({ name: 'self_assessment_symptom' })
   symptoms!: Symptom[]

   @Column()
   notes!: string

   @CreateDateColumn()
   createdAt!: Date

   @UpdateDateColumn()
   updatedAt!: Date
}
