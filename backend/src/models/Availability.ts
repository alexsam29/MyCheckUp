import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./doctor";
import { SelfAssessment } from "./self-assessment";

/**
 * Avaliblity database model.
 * 
 * id - unique id of the availability table. 
 * doctorid - unique id of the doctor from doctors table. *(Many to One) Relation.
 * date - date of the availability.
 * availableFrom - Starting date of the availability.
 * availableTo - End date of the availablity.
 * appointmentDuration - How long they are available.
 * createdAt - Created date.
 * updatedAt - Lateste updated date.
 * appointment - *(One to One) Relation.
 */

@Entity()
export class Availability
{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToOne(() => Doctor, doctor => doctor)
    doctor!: Doctor

    @Column({type: 'date', nullable: true})
    date!: Date

    @Column({type: 'date', nullable: true})
    availableFrom!: Date
    
    @Column({type: 'date', nullable: true})
    avalibleTo!: Date

    @Column({type: 'time', nullable: true})
    appointmentDuration!: Date

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToOne(() => SelfAssessment)
    @JoinColumn()
    appointment!: SelfAssessment
}