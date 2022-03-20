import { ApiError } from "../exceptions/api-error";
import { AppointmentStatus } from "../models/appointment-status";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import { getRepository } from "typeorm";
import { Appointment } from "../models/appointment";
import { DoctorService } from "./doctor-service";


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


   /*Doctor***********************************************************************************************************/

   async appointmentTimesBooked(searchBy?: {doctorId?: string}, offset = 0, limit = 100): Promise<Appointment[]>
   {
      const appointmentTime = getRepository(Appointment)

      const appointmentTimes = await appointmentTime.find({
         select: ['id', 'patientId', 'doctorId', 'selfAssessmentId', 'date' ,'startTime', 
         'endTime', 'status', 'doctorNotes', 'createdAt', 'updatedAt'],
         where: searchBy,
         order: { createdAt: 'DESC'}, 
         skip: offset, 
         take: limit
      })


      if(!appointmentTimes || !appointmentTimes.length)
         throw ApiError.NotFound('No appointment time has been found for this doctor!')

      return appointmentTimes
   },

   async appointmentTimesAvailable(doctorId: string, searchBy?: {doctorId?: string, date?: string, status?: string}, offset = 0, limit = 100): Promise<Appointment[]>
   {
      const appointmentTime = getRepository(Appointment)

      const appointmentTimes = await appointmentTime.find({
         select: ['id', 'patientId', 'doctorId', 'selfAssessmentId', 'date' ,'startTime', 
         'endTime', 'status', 'doctorNotes', 'createdAt', 'updatedAt'],
         where: searchBy, 
         order: { createdAt: 'DESC'}, 
         skip: offset, 
         take: limit
      })

      if(!appointmentTimes || !appointmentTimes.length)
      throw ApiError.NotFound('No appointment time has been found for this doctor!')

      

      /* -------------------------------------------------------------------------------------- */
      const date = searchBy?.date
      const dayOfWeek = this.getDayOfTheWeek(date)

      if(dayOfWeek == null)
         throw ApiError.NotFound('No week day has been found!')                                      


      const availability = await DoctorService.findAvailabilityByDay(doctorId, dayOfWeek)

   
      
      if(availability.availableFrom == null || availability.availableTo == null)
         throw ApiError.NotFound("Availibility is null!")


      // Returns the diffirence between two hours // 8      
      const difference = this.differenceInTimeString(availability.availableFrom, availability.availableTo)

      

      // Number of appointments that can be booked during the day. // 16
      let numberOfAppointment = (difference * 60) / 30

      

      // An object to store the available times
      //let availibleTimes: {From: string, To: string, date: string}[]; 


      let startFrom = new Date (date + " " + availability.availableFrom)
      //let endTo = new Date (date + " " + availability.availableTo)
      
      let startTimeString = this.TimeToString(startFrom)
      //let endTimeString = this.TimeToString(endTo)
      
      let minToAdd = 30;
      

      for(let i = 0; i < numberOfAppointment; ++i)
      {   
         for(let j = 0; j < appointmentTimes.length; ++i)
         {
               if(appointmentTimes[j].startTime != startTimeString || appointmentTimes[j].startTime)
               {
                  let newDate = new Date (startFrom.getTime() + minToAdd*60000)
                  console.log(newDate)
         
               }
         }

      } 
      
      
      return appointmentTimes
   }, 

   getDayOfTheWeek(date: any)
   {
      const dayOfWeek = new Date(date).getDay()
      return isNaN(dayOfWeek) ? null : [0, 1, 2, 3, 4, 5, 6][dayOfWeek + 1]
   }, 


   differenceInTimeString(_: string , __: string): number
   {
      // let array = time1.split(":");
      // let seconds = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10) 
      // let hour = seconds / 3600
      

      // let array = time2.split(":");
      // let seconds2 = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
      // let hour2 = seconds2 / 3600 

      // return hour2 - hour // 8 
      return 0
   }, 

   TimeToString(time: Date)
   {
      let h = time.getHours()
      let m = time.getMinutes()

      let newh = ""

      if(h==0 ||h==1 || h==2 || h==3 || h==4 || h==5 || h==6 || h==7 || h==8 || h==9)
      {
         newh = '0' + h.toString() + ':' 
      }
      else
      {
         newh = h.toString() + ':'
      } 

      
      if(m==0)
      {
         newh += '0' + m.toString() + ':' + '00'  
      }
      else
      {
         newh += m.toString() + ':' + '00'
      }

      console.log(newh)

      return newh
   }
}


