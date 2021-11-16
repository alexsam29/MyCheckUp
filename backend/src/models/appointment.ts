import { Entity, Column} from 'typeorm'
import { Task } from './task-class'
import { Tasks } from './task-enum'


/**
 * Appointment database mdoel.
 * 
 * Fields: 
 * id - patient id, task id, doctor id.
 * bookingDate - booking date. 
 * bookingTime - booking time.
 * TcareatedAt - Created time and date.
 * task - (Appoinment, Prescription, Self-Assessment)
 */

@Entity()
export class Appointment extends Task
{
    @Column({
        type: 'enum', 
        enum: Tasks,
    })
    override task!: Tasks.APOINTMENTS 

    @Column()
    patientFName!: string

    @Column()
    patientLName!: string

    @Column({ type: 'date'})
    bookingDate!: Date

    @Column('time')
    bookingTime!: Date
}




