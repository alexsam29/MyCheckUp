import { Column, CreateDateColumn, ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
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

@Entity()
export class Task
{
    @PrimaryGeneratedColumn('uuid')
    Taskid!: string

    @ManyToOne(() => Patient, patient => patient)
    @JoinColumn()
    patient!: Patient

    @ManyToOne(() => Doctor, doctor => doctor)
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



