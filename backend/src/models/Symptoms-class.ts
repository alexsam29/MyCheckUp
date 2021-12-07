import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AssessmentSymptoms } from "./AssessmentSymptoms"


/**
 * Symptoms data base model. 
 * 
 * Fields:
 * 
 * id - uniqe id of the symptoms
 * Fever - type boolean (true or false)
 * Cough - type boolean (true or false)
 * Headache - type boolean (true or false)
 * SoreThroat - type boolean (true or false)
 * Diarrhea - type boolean (true or false)
 * BodyPain - type boolean (true or false)
 * BreathShortness - type boolean (true or false)
 * description - additional description added by the patient.
 * createdAt - Created date.
 * updatedAt - Lateste updated date.
 * assessmentSymptoms - *(One to Many) Relation.
 */

@Entity()
export class Symptoms
{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    Fever!: boolean
    
    @Column()
    Cough!: boolean
    
    @Column()
    Headache!: boolean
    
    @Column()
    SoreThroat!: boolean
    
    @Column()
    Diarrhea!: boolean
    
    @Column()
    BodyPain!: boolean
    
    @Column()
    BreathShortness!: boolean

    @Column()
    description!: string

    @OneToMany(() => AssessmentSymptoms, assessmentSymptoms => assessmentSymptoms)
    assessmentSymptoms!: AssessmentSymptoms

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}