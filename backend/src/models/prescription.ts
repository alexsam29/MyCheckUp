import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./doctor";
import { Patient } from "./patient";

/**
 * Ptient prescription database mdoel.
 * 
 * Fields:
 * patient id - Id of the patient from patient table. *(Many to One) Relation.
 * doctor id - Id of the doctor from doctor table. *(Many to One) Relation.
 * prescriptionId - Primary id of the prescription table.
 * effectiveDate - efective date of the prescription. 
 * expirayDate - end date of prescription.
 * description - provided by the doctor.
 * numOfRefill - number of times they can get the drug.
 * createdAt - Created date.
 * updatedAt - Lateste updated date.
 */


@Entity()
export class Prescription 
{
    @PrimaryGeneratedColumn('uuid')
    Id!: string

    @ManyToOne(() => Patient, patient => patient)
    patient!: Patient

    @ManyToOne(() => Doctor, doctor => doctor)
    doctor!: Doctor

    @Column({nullable: true})
    description!: string

    @Column({nullable: true})
    numOfRefill!: number

    @Column({type: 'date', nullable: true})
    effectiveDate!: string

    @Column({type:'date', nullable: true})
    expiryDate!: Date

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}