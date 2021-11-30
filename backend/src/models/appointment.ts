import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { Doctor } from './doctor'
import { Patient } from './patient'



/**
 * Appointment database mdoel.
 * 
 * Fields: 
 * patient id - Id of the patient from patient table. *(Many to One) Relation.
 * doctor id - Id of the doctor from doctor table. *(Many to One) Relation.
 * appointmentId - Primary id of the appointment table.
 * startDate - Start date of the appointment.
 * endDate - End date of the appointment.  
 * startTime - Start time of the appointment.
 * endTime - End time of the appointment.
 * status - Current status of the patient.
 * notes - Optional notes provided by the patient or the doctor.
 * createdAt - Created date.
 * updatedAt - Lateste updated date.
 */

@Entity()
export class Appointment 
{
    @PrimaryGeneratedColumn('uuid')
    Id!: string

    @ManyToOne(() => Patient, patient => patient)
    patient!: Patient

    @ManyToOne(() => Doctor, doctor => doctor)
    doctor!: Doctor

    @Column({ type: 'date', nullable: true})
    startDate!: Date

    @Column({type: 'date', nullable: true})
    endDate!: Date

    @Column({type:'time', nullable: true})
    startTime!: Date

    @Column({type:'time', nullable: true})
    endTime!: Date

    @Column({nullable: true})
    satus!: string 

    @Column({nullable: true})
    notes!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    
}




