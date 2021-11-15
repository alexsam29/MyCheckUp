import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn} from 'typeorm'
import { Tasks } from './task-enum'
import { Doctor } from './doctor'
import { Patient } from './patient'



/*
* Task abstract model. 
* 
* Fields: 
* id - TaskId, patientID, doctorID
* Task - Task type (Appoinment, Prescription, Self-Assessment)
* Created time - Task Create time. 
*/

export abstract class Task
{
    @PrimaryGeneratedColumn("uuid")
    Taskid!: string

    @OneToOne(() => Patient)
    @JoinColumn()
    patient!: Patient

    @OneToOne(() => Doctor)
    @JoinColumn()
    doctor!: Doctor

    @Column({
        type: 'enum', 
        enum: Tasks,
    })
    task!: Tasks

    @CreateDateColumn()
    TcreatedAt!: Date
}



