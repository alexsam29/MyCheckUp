import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Task } from './task-class'
import { Tasks } from './task-enum'

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
    @PrimaryGeneratedColumn('uuid')
    Pid!: string

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

    @Column({
        type: 'enum',
        enum: Tasks,
    })
    override task!: Tasks.PRESCRIPTION 
}