import { getRepository, Like } from 'typeorm'
import bcrypt from 'bcrypt'
import { Doctor } from '../models/doctor'
import { Role } from '../models/role'
import { ApiError } from '../exceptions/api-error'
import { SearchQuery } from './utils/search-query'
import { Availability } from '../models/availability'
import { WeekDay } from '../models/week-day'

/**
 * Handles business logic for `Doctor` model.
 */
export const DoctorService = {
   /**
    * Adds new doctor to the database. Sets account as inactive.
    *
    * @param doctorDto New doctor information.
    * @returns Created doctor.
    */
   async create(doctorDto: {
      email: string
      password: string
      firstName: string
      lastName: string
      license?: string
      specialty?: string
      title?: string
      phoneNumber?: string
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const found = await repository.findOne({ email: doctorDto.email })
      if (found) {
         throw ApiError.BadRequest('Doctor account with this email already exists')
      }

      const newDoctor = new Doctor()
      newDoctor.email = doctorDto.email
      newDoctor.password = await bcrypt.hash(doctorDto.password, 10)
      newDoctor.firstName = doctorDto.firstName
      newDoctor.lastName = doctorDto.lastName
      newDoctor.role = Role.DOCTOR
      newDoctor.active = false
      if (doctorDto.license) newDoctor.license = doctorDto.license
      if (doctorDto.specialty) newDoctor.specialty = doctorDto.specialty
      if (doctorDto.title) newDoctor.title = doctorDto.title
      if (doctorDto.phoneNumber) newDoctor.phoneNumber = doctorDto.phoneNumber

      const created = await repository.save(newDoctor)

      return { ...created, password: '' }
   },

   /**
    * Updates doctor account in the database.
    * Requires doctor `id`, other fields are optional.
    * Only provided fields will be updated.
    *
    * @param doctorDto Doctor id and updated information.
    * @returns Updated doctor.
    */
   async update(doctorDto: {
      id: string
      email?: string
      password?: string
      firstName?: string
      lastName?: string
      license?: string
      specialty?: string
      title?: string
      phoneNumber?: string
      active?: boolean
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne(doctorDto.id)
      if (!doctor) throw ApiError.NotFound('Doctor not found')

      if (doctorDto.email) doctor.email = doctorDto.email
      if (doctorDto.password)
         doctor.password = await bcrypt.hash(doctorDto.password, 10)
      if (doctorDto.firstName) doctor.firstName = doctorDto.firstName
      if (doctorDto.lastName) doctor.lastName = doctorDto.lastName
      if (doctorDto.license) doctor.license = doctorDto.license
      if (doctorDto.specialty) doctor.specialty = doctorDto.specialty
      if (doctorDto.title) doctor.title = doctorDto.title
      if (doctorDto.phoneNumber) doctor.phoneNumber = doctorDto.phoneNumber
      if (doctorDto.active !== undefined) doctor.active = doctorDto.active

      const updated = await repository.save(doctor)

      return { ...updated, password: '' }
   },

   /**
    * Find doctor accounts in the database that match given conditions.
    *
    * @param searchBy Search condition (optional).
    * @param exact Matches exactly if true (optinal, defaul false).
    * @param offset Search offset (optinal).
    * @param limit Maximum number of accounts to be returned (optional, default 100).
    * @returns Array of found doctor accounts.
    */
   async find(
      searchBy?: {
         email?: string
         firstName?: string
         lastName?: string
         license?: string
         specialty?: string
         title?: string
         phoneNumber?: string
         active?: boolean
      },
      options?: SearchQuery
   ): Promise<Doctor[]> {
      const repository = getRepository(Doctor)

      const where: { [key: string]: any } = { ...searchBy }
      if (!options?.exact) {
         for (let key in where) {
            if (typeof where[key] === 'string') where[key] = Like(`%${where[key]}%`)
         }
      }

      const doctors = await repository.find({
         select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'license',
            'specialty',
            'title',
            'phoneNumber',
            'active',
         ],
         where: where,
         order: { createdAt: 'DESC' },
         skip: options?.offset,
         take: options?.limit,
      })

      if (!doctors || !doctors.length)
         throw ApiError.NotFound(`No doctor profiles were found`)

      return doctors
   },

   /**
    * Finds one (first matching) doctor account in the database.
    *
    * @param searchBy Search condition (optional).
    * @returns Found doctor.
    */
   async findOne(searchBy?: {
      id?: string
      email?: string
      license?: string
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne({
         select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'license',
            'specialty',
            'title',
            'phoneNumber',
            'active',
         ],
         where: searchBy,
      })

      if (!doctor) throw ApiError.NotFound('Doctor account not found')

      return doctor
   },

   /**
    * Finds doctor account by credentials.
    *
    * @param email Doctor's email.
    * @param password Doctor's password.
    * @returns Found doctor account.
    */
   async findByCredentials(email: string, password: string): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne({ email })
      if (!doctor) throw ApiError.NotFound('Doctor account not found')

      const passwordsMatch = await bcrypt.compare(password, doctor.password)
      if (!passwordsMatch) throw ApiError.NotFound('Doctor account not found')

      return { ...doctor, password: '' }
   },

   /**
    * Removes specified doctor account from the database.
    *
    * @param id Doctor id.
    * @returns Removed doctor.
    */
   async remove(id: string): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne(id)
      if (!doctor) throw ApiError.NotFound('Doctor account not found')

      await repository.remove(doctor)

      return { ...doctor, password: '' }
   },

   /**
    * Sets doctor availability for selected week day.
    *
    * @param details Availability details. Appointment duration is in minutes.
    * @return Availability.
    */
   async setAvailability(details: {
      doctorId: string
      weekDay: WeekDay
      isAvailable: boolean
      availableFrom?: string | null
      availableTo?: string | null
      appointmentDuration?: number
   }): Promise<Availability> {
      if (
         details.isAvailable &&
         (!details.availableFrom ||
            !details.availableTo ||
            !details.appointmentDuration)
      ) {
         throw ApiError.BadRequest(
            'Must specify available times and appointment duration if doctor is available'
         )
      }

      const availabilityRepo = getRepository(Availability)

      const candidate = await availabilityRepo.findOne({
         doctorId: details.doctorId,
         weekDay: details.weekDay,
      })

      if (candidate) {
         candidate.weekDay = details.weekDay
         candidate.isAvailable = details.isAvailable
         if (details.availableFrom !== undefined) {
            candidate.availableFrom = details.availableFrom
         }
         if (details.availableTo !== undefined) {
            candidate.availableTo = details.availableTo
         }
         if (details.appointmentDuration) {
            candidate.appointmentDuration = details.appointmentDuration
         }

         const updated = await availabilityRepo.save(candidate)

         return updated
      }

      const doctorRepo = getRepository(Doctor)
      const doctor = await doctorRepo.findOne(details.doctorId)

      if (!doctor) throw ApiError.NotFound('Doctor not found')

      const availability = new Availability()
      availability.doctor = doctor
      availability.weekDay = details.weekDay
      availability.isAvailable = details.isAvailable
      if (details.availableFrom !== undefined) {
         availability.availableFrom = details.availableFrom
      }
      if (details.availableTo !== undefined) {
         availability.availableTo = details.availableTo
      }
      if (details.appointmentDuration) {
         availability.appointmentDuration = details.appointmentDuration
      }

      const saved = await availabilityRepo.save(availability)

      return saved
   },

   /**
    * Finds all available days & times for the doctor.
    *
    * @param doctorId Doctor id.
    * @returns Array of found availability days.
    */
   async findAvailability(doctorId: string): Promise<Availability[]> {
      const repository = getRepository(Availability)

      const availabilities = await repository.find({ doctorId })
      if (!availabilities) throw ApiError.NotFound('Availability not found')

      return availabilities
   },

   /**
    * Find doctor availability for the specified week day.
    *
    * I.e., Sunday = 0, Monday = 1, etc.
    *
    * @param doctorId Doctor id.
    * @param weekDay Day of the week (0-6).
    * @returns Found availability.
    */
   async findAvailabilityByDay(
      doctorId: string,
      weekDay: number
   ): Promise<Availability> {
      const repository = getRepository(Availability)

      const availability = await repository.findOne({ doctorId, weekDay })
      if (!availability) throw ApiError.NotFound('Availability not found')

      return availability
   },
}
