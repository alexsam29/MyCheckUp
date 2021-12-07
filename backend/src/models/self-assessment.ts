import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./appointment";
import { AssessmentSymptoms } from "./AssessmentSymptoms";




/**
 * Self Assessment database model. 
 * 
 * Fields: 
 * SelfAssessmentId - Primary generated ID of the SelfAssessment table.
 * appointmentId - Id of the appointment table. *(One to One) Relation. 
 * Notes - Notes provided by the patient or the doctor.
 * createdAt - Created date.
 * updatedAt - Lateste updated date.
 */


@Entity()
export class SelfAssessment 
{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(() => Appointment)
    @JoinColumn()
    appointment!: Appointment

    @OneToMany(() => AssessmentSymptoms, assessmentSymptoms => assessmentSymptoms)
    assessmentSymptoms!: AssessmentSymptoms

    @Column({nullable: true})
    Notes!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}