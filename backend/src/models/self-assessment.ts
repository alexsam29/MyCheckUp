import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Symptoms } from "./symptom"
import { Task } from "./task-class"
import { Tasks } from './task-enum'

/**
 * Self Assessment database model. 
 * 
 * Fields: 
 * Taskid - Id of the task that has benn done is unique
 * task - type of the task completed
 * TcreatedAt - date of the task that has been created
 * SAid - Self assissment task unique id 
 * Mdescription - more dicription provided by the patient
 * TermsPolicies - patient agree or do not agree to the terms
 * patientid - unique id of the patient
 * doctorid - uinqueid of the doctor
 */
@Entity()
export class SelfAssessment extends Task {
   @PrimaryGeneratedColumn('uuid')
   SAid!: string

   @ManyToMany(() => Symptoms, symptoms => symptoms)
   @JoinTable()
   symptoms!: Symptoms[]


   @Column({
      type: 'enum',
      enum: Tasks,
   })
   override task!: Tasks.SELFASSESSMENT

   @Column()
   Mdescription!: string

   @Column()
   TermsPolicies!: boolean
}
