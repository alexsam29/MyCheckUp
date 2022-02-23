import { ApiError } from "../exceptions/api-error";
import { AppointmentStatus } from "../models/appointment-status";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import { getRepository } from "typeorm";
import { Appointment } from "../models/appointment";



export const AppointmentService = {

   /**
    * Booking and appointment for a patient.
    * 
    * @param details set of passes parameters to book. 
    * @returns saved appointment.
    */
    async setAppointment(details: {
    patientId: string, 
    doctorId: string, 
    //selfAssessmentId: string, 
    date: Date, 
    startTime: string, 
    endTime: string, 
    doctorNotes: string
    }) : Promise<Appointment> {

        const appointmentRepo = getRepository(Appointment)
        const patientRepo = getRepository(Patient)
        const doctorRepo = getRepository(Doctor)
        //const selfAssessmentRepo = getRepository(SelfAssessment)

        const patient = await patientRepo.findOne(details.patientId)
        const doctor = await doctorRepo.findOne(details.doctorId)
        //const selfassessment = await selfAssessmentRepo.findOne(details.selfAssessmentId)
        
        // To find any appointment already book in the system
        const appointments = await appointmentRepo.find({
            select: ['id', 'patientId', 'doctorId', 'selfAssessmentId',
            'date', 'startTime', 'endTime', 'status', 'doctorNotes'],
            where: {startTime: details.startTime},
            order: { createdAt: 'DESC'}, 
        })
        

        if(!patient) 
            throw ApiError.NotFound('Patient not found!')

        if(!doctor) 
            throw ApiError.NotFound('Doctor not found!') 

        if(appointments.length != 0)
            throw "This time has is already booked!"
        //if(!selfassessment) 
        // throw ApiError.NotFound('SelfAssessment not found!')

        

        const appointment = new Appointment()
        appointment.doctor = doctor
        appointment.patient = patient
        //appointment.selfAssessment = selfassessment
        appointment.date = details.date
        appointment.startTime = details.startTime
        appointment.endTime = details.endTime
        appointment.status = AppointmentStatus.PENDING
        appointment.doctorNotes = details.doctorNotes


        const saved = await appointmentRepo.save(appointment)

        return saved 
    },


    /**
     * Returns first appointment found for the patient.
     * @param patientId 
     * @returns 
     */
    async findAppointment(searchBy?: {patientId?: string}, offset = 0, limit = 100): Promise<Appointment[]>
    {

        const repository = getRepository(Appointment)

        const appointments = await repository.find({
            select: ['id', 'patientId', 'doctorId', 'selfAssessmentId',
            'date', 'startTime', 'endTime', 'status', 'doctorNotes'],
            where: searchBy, 
            order: { createdAt: 'DESC'}, 
            skip: offset, 
            take: limit
        })

        if(!appointments || !appointments.length)
            throw ApiError.NotFound('No appointment found for this patient!')


        return appointments
    },



    async appointmentTimesBooked(searchBY?: {doctorId?: string}, offset = 0, limit = 100): Promise<Appointment[]>
    {
        const appointmentTime = getRepository(Appointment)

        const appointmentTimes = await appointmentTime.find({
            select: ['startTime', 'endTime'],
            where: searchBY,
            order: { createdAt: 'DESC'}, 
            skip: offset, 
            take: limit
        })

        if(!appointmentTimes || !appointmentTimes.length)
            throw ApiError.NotFound('No appointment time has been found for this doctor!')

        return appointmentTimes
    }

    

}