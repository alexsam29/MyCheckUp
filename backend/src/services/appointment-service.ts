import { ApiError } from '../exceptions/api-error'
import { AppointmentStatus } from '../models/appointment-status'
import { Doctor } from '../models/doctor'
import { Patient } from '../models/patient'
import { getRepository } from 'typeorm'
import { Appointment } from '../models/appointment'
import { DoctorService } from './doctor-service'
import { SelfAssessment } from '../models/self-assessment'

export const AppointmentService = {
   /**
    * Booking and appointment for a patient.
    *
    * @param details set of passes parameters to book.
    * @returns saved appointment.
    */
   async setAppointment(details: {
      patientId: string
      doctorId: string
      date: Date
      startTime: string
      endTime: string
      doctorNotes: string
   }): Promise<Appointment> {
      const appointmentRepo = getRepository(Appointment)
      const patientRepo = getRepository(Patient)
      const doctorRepo = getRepository(Doctor)

      const patient = await patientRepo.findOne(details.patientId)
      const doctor = await doctorRepo.findOne(details.doctorId)

      // To find any appointment already book in the system
      const appointments = await appointmentRepo.find({
         select: [
            'id',
            'patientId',
            'doctorId',
            'selfAssessmentId',
            'date',
            'startTime',
            'endTime',
            'status',
            'doctorNotes',
         ],
         where: {
            startTime: details.startTime,
            date: details.date,
            status: AppointmentStatus.PENDING,
         },
         order: { createdAt: 'DESC' },
      })

      if (!patient) throw ApiError.NotFound('Patient not found!')

      if (!doctor) throw ApiError.NotFound('Doctor not found!')

      if (appointments.length != 0) throw 'This time is already booked!'

      const appointment = new Appointment()
      appointment.doctor = doctor
      appointment.patient = patient
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
   async findAppointment(
      searchBy?: { patientId?: string; doctorId?: string },
      offset = 0,
      limit = 100
   ): Promise<Appointment[]> {
      const repository = getRepository(Appointment)

      const appointments = await repository.find({
         select: [
            'id',
            'patientId',
            'doctorId',
            'selfAssessmentId',
            'date',
            'startTime',
            'endTime',
            'status',
            'doctorNotes',
         ],
         where: searchBy,
         skip: offset,
         take: limit,
      })

      if (!appointments || !appointments.length)
         throw ApiError.NotFound('No appointment found for this patient!')

      return appointments
   },

   async findAppointmentById(appointmentId: string): Promise<Appointment> {
      const appointment = await getRepository(Appointment).findOne(appointmentId)
      if (!appointment) {
         throw ApiError.NotFound('Appointment not found')
      }

      return appointment
   },

   async setSelfAssessment(
      appointmentId: string,
      assessment: SelfAssessment
   ): Promise<Appointment> {
      const repository = getRepository(Appointment)

      const appointment = await repository.findOne(appointmentId)
      if (!appointment) {
         throw ApiError.NotFound('Appointment not found')
      }

      appointment.selfAssessment = assessment

      return repository.save(appointment)
   },

   /*Doctor***********************************************************************************************************/

   async appointmentTimesBooked(
      searchBy?: { doctorId?: string },
      offset = 0,
      limit = 100
   ): Promise<Appointment[]> {
      const appointmentTime = getRepository(Appointment)

      const appointmentTimes = await appointmentTime.find({
         select: [
            'id',
            'patientId',
            'doctorId',
            'selfAssessmentId',
            'date',
            'startTime',
            'endTime',
            'status',
            'doctorNotes',
            'createdAt',
            'updatedAt',
         ],
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit,
      })

      if (!appointmentTimes || !appointmentTimes.length)
         throw ApiError.NotFound(
            'No appointment time has been found for this doctor!'
         )

      return appointmentTimes
   },

   async appointmentTimesAvailable(
      doctorId: string,
      searchBy?: { doctorId?: string; date?: string; status?: string },
      offset = 0,
      limit = 100
   ) {
      const appointmentTime = getRepository(Appointment)

      const appointmentTimes = await appointmentTime.find({
         select: [
            'id',
            'patientId',
            'doctorId',
            'selfAssessmentId',
            'date',
            'startTime',
            'endTime',
            'status',
            'doctorNotes',
            'createdAt',
            'updatedAt',
         ],
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit,
      })

      if (!appointmentTimes || !appointmentTimes.length)
         throw ApiError.NotFound(
            'No appointment time has been found for this doctor!'
         )

      /* -------------------------------------------------------------------------------------- */

      if (searchBy?.date == null) throw ApiError.NotFound('Date is null !')

      const date = searchBy?.date
      const dayOfWeek = this.getDayOfTheWeek(date)

      if (dayOfWeek == null) throw ApiError.NotFound('No week day has been found!')

      const availability = await DoctorService.findAvailabilityByDay(
         doctorId,
         dayOfWeek
      )

      if (availability.availableFrom == null || availability.availableTo == null)
         throw ApiError.NotFound('Availibility is null!')

      // Returns the diffirence between two hours // 8
      const difference = this.differenceInTimeString(
         availability.availableFrom,
         availability.availableTo
      )

      // Number of appointments that can be booked during the day. // 16
      var numberOfAppointment = (difference * 60) / 30

      // An object array to store the available times
      var availibleTimes: {
         From: string
         To: string
         Date: string
         Available: boolean
      }[] = [{ From: '', To: '', Date: '', Available: true }]

      var startFrom = new Date(date + ' ' + availability.availableFrom)
      var endTo = new Date(date + ' ' + availability.availableTo)
      var startTimeString = this.TimeToString(startFrom)
      var endTimeString = this.TimeToString(endTo)

      // Returns time with 30 min added to it as a string
      var capturedAddedTime = this.AddHalfHour(startFrom)

      // Initilizing the first time slot
      var newTimeSlot
      let j
      for (j = 0; j < appointmentTimes.length; ++j) {
         if (appointmentTimes[j].startTime == startTimeString)
            newTimeSlot = {
               From: startTimeString,
               To: this.TimeToString(capturedAddedTime),
               Date: date,
               Available: false,
            }
         else
            newTimeSlot = {
               From: startTimeString,
               To: this.TimeToString(capturedAddedTime),
               Date: date,
               Available: true,
            }
      }

      if (newTimeSlot != undefined) availibleTimes.push(newTimeSlot)

      // temp variables to update times
      var capturedAddedTime2
      var capturedAddedTime3 = capturedAddedTime

      for (let i = 0; i < numberOfAppointment; ++i) {
         capturedAddedTime2 = this.AddHalfHour(capturedAddedTime)

         let flag = false
         // Checking for the currnet booked times
         for (j = 0; j < appointmentTimes.length; ++j)
            if (
               appointmentTimes[j].startTime == this.TimeToString(capturedAddedTime3)
            ) {
               newTimeSlot = {
                  From: this.TimeToString(capturedAddedTime3),
                  To: this.TimeToString(capturedAddedTime2),
                  Date: date,
                  Available: false,
               }
               flag = true
            }

         if (flag != true)
            newTimeSlot = {
               From: this.TimeToString(capturedAddedTime3),
               To: this.TimeToString(capturedAddedTime2),
               Date: date,
               Available: true,
            }

         if (newTimeSlot != undefined)
            if (newTimeSlot.From != endTimeString) availibleTimes.push(newTimeSlot)

         capturedAddedTime3 = capturedAddedTime2
         capturedAddedTime = capturedAddedTime2
         j++
      }

      return availibleTimes
   },

   getDayOfTheWeek(date: any) {
      const dayOfWeek = new Date(date).getDay()
      return isNaN(dayOfWeek) ? null : [0, 1, 2, 3, 4, 5, 6][dayOfWeek + 1]
   },

   differenceInTimeString(time1: string, time2: string) {
      var time1 = time1
      var array = time1.split(':')
      var seconds =
         parseInt(array[0], 10) * 60 * 60 +
         parseInt(array[1], 10) * 60 +
         parseInt(array[2], 10)
      var hour = seconds / 3600

      var time2 = time2
      var array = time2.split(':')
      var seconds2 =
         parseInt(array[0], 10) * 60 * 60 +
         parseInt(array[1], 10) * 60 +
         parseInt(array[2], 10)
      var hour2 = seconds2 / 3600

      return hour2 - hour // 8
   },

   TimeToString(time: Date) {
      var h = time.getHours()
      var m = time.getMinutes()

      var newh = ''

      if (
         h == 0 ||
         h == 1 ||
         h == 2 ||
         h == 3 ||
         h == 4 ||
         h == 5 ||
         h == 6 ||
         h == 7 ||
         h == 8 ||
         h == 9
      ) {
         newh = '0' + h.toString() + ':'
      } else {
         newh = h.toString() + ':'
      }

      if (m == 0) {
         newh += '0' + m.toString() + ':' + '00'
      } else {
         newh += m.toString() + ':' + '00'
      }

      return newh
   },

   AddHalfHour(StartFrom: Date) {
      var minToAdd = 30
      var newDate = new Date(StartFrom.getTime() + minToAdd * 60000)
      return newDate
   },

   async deleteingAppointment(id: string): Promise<Appointment> {
      const appointmentTime = getRepository(Appointment)

      const appointment = await appointmentTime.findOne(id)

      console.log(appointment)

      if (!appointment)
         throw ApiError.NotFound(
            'No appointment time has been found for this doctor!'
         )

      appointment.status = AppointmentStatus.CANCELLED

      const saved = await appointmentTime.save(appointment)

      return saved
   },

   async rescheduleAppointment(
      id: string,
      date: string,
      startFrom: string,
      endTime: string
   ): Promise<Appointment> {
      const appointment = getRepository(Appointment)

      const appointmentfound = await appointment.findOne(id)

      if (!appointmentfound)
         throw ApiError.NotFound(
            'No appointment time has been found for this doctor!'
         )

      const dateConverted = new Date(date)

      console.log(dateConverted)

      appointmentfound.date = dateConverted
      appointmentfound.startTime = startFrom
      appointmentfound.endTime = endTime

      const saved = await appointment.save(appointmentfound)

      return saved
   },
}
