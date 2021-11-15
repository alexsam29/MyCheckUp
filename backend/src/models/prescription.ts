import { Column, Entity } from "typeorm";
import { Task } from './task-class'

/**
 * Ptient prescription database mdoel.
 * 
 * Fields:
 * id - patient , doctor, prescription. 
 * firstname - patient , doctor.
 * lastname - patient , doctor.
 * date - efective date. 
 * description - doctor.
 * numOfRefill - number of times they can get the drug.
 * expirayDate - date of expiry.
 */


@Entity()
export class Prescription extends Task
{
    @Column()
    patientFName!: string

    @Column()
    patientLName!: string

    @Column()
    description!: string

    @Column()
    numOfRefill!: number

    @Column()
    expiryDate!: Date
}