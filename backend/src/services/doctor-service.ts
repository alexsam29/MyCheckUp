import { getRepository, Like } from 'typeorm'
import bcrypt from 'bcrypt'
import { Doctor } from '../models/doctor'
import { Role } from '../models/role'
import { ApiError } from '../exceptions/api-error'

/**
 * Handles business logic for `Doctor` model.
 */
export const DoctorService = {
   /**
    * Adds new doctor to the database.
    * 
    * @param doctorDto New doctor information.
    * @returns Created doctor.
    */
   async create(doctorDto: {
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      license?: string,
      specialty?: string,
      title?: string,
      phoneNumber?: string
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

     const found = await repository.findOne({ email: doctorDto.email })
     if (found) throw ApiError.BadRequest('Doctor account with this email already exists')

      const newDoctor = new Doctor()
      newDoctor.email = doctorDto.email
      newDoctor.password = await bcrypt.hash(doctorDto.password, 10)
      newDoctor.firstName = doctorDto.firstName
      newDoctor.lastName = doctorDto.lastName
      newDoctor.role = Role.DOCTOR
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
      id: string,
      email?: string,
      password?: string,
      firstName?: string,
      lastName?: string,
      license?: string,
      specialty?: string,
      title?: string,
      phoneNumber?: string
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne(doctorDto.id)
      if (!doctor) throw ApiError.NotFound('Doctor not found')

      if (doctorDto.email) doctor.email = doctorDto.email
      if (doctorDto.password) doctor.password = await bcrypt.hash(doctorDto.password, 10)
      if (doctorDto.firstName) doctor.firstName = doctorDto.firstName
      if (doctorDto.lastName) doctor.lastName = doctorDto.lastName
      if (doctorDto.license) doctor.license = doctorDto.license
      if (doctorDto.specialty) doctor.specialty = doctorDto.specialty
      if (doctorDto.title) doctor.title = doctorDto.title
      if (doctorDto.phoneNumber) doctor.phoneNumber = doctorDto.phoneNumber

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
   async find(searchBy?: {
      email?: string,
      firstName?: string,
      lastName?: string,
      license?: string
      specialty?: string,
      title?: string,
      phoneNumber?: string
   }, exact = false, offset = 0, limit = 100): Promise<Doctor[]> {
      const repository = getRepository(Doctor)

      const where: { [key: string]: any } = { ...searchBy }
      if (!exact) {
         for (let key in where) {
            where[key] = Like(`%${where[key]}%`)
         }
      }

      const doctors = await repository.find({
         select: ['id', 'firstName', 'lastName', 'email', 'license',
            'specialty', 'title', 'phoneNumber', 'active'],
         where: where,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit
      })

      if (!doctors || !doctors.length) throw ApiError.NotFound(`No doctor profiles were found`)

      return doctors
   },

   /**
    * Finds one (first matching) doctor account in the database.
    * 
    * @param searchBy Search condition (optinal).
    * @returns Found doctor.
    */
   async findOne(searchBy?: {
      id?: string,
      email?: string,
      license?: string
   }): Promise<Doctor> {
      const repository = getRepository(Doctor)

      const doctor = await repository.findOne({
         select: ['id', 'firstName', 'lastName', 'email', 'license',
            'specialty', 'title', 'phoneNumber', 'active'],
         where: searchBy
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
   }
}
