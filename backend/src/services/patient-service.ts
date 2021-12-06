import { Patient } from "../models/patient";
import { getRepository} from "typeorm";
import bcrypt from 'bcrypt'
import { ApiError } from "../exceptions/api-error";
import { Role } from "../models/role";
/**
 * Handles business logic for `Patient` model.
 */
export const PatientService = {


    async create(patientData: {
        
        firstName: string,
        lastName: string,
        password: string,
        email: string,
        dateOfbirth: Date,
        phoneNumber: string,
        address: string     
    }): Promise<Patient>{

        const repository = getRepository(Patient)

        // Check for existing email.
        const found = await repository.findOne({email: patientData.email})
        if(found)
            throw ApiError.BadRequest('Patient account with this email already exists!')

        // Create new patient
        const newPatient = new Patient()
        newPatient.firstName = patientData.firstName
        newPatient.lastName = patientData.lastName
        newPatient.password = await bcrypt.hash(patientData.password, 10)
        newPatient.email = patientData.email
        console.log(patientData.dateOfbirth)
        newPatient.dateOfBirth = new Date (patientData.dateOfbirth)
        newPatient.phoneNumber = patientData.phoneNumber
        newPatient.address = patientData.address
        newPatient.role = Role.PATIENT

        // Insert to database
        const created = await repository.save(newPatient)

        return {...created, password: ''}
    },

    /**
    * Updates patient account in the database.  
    * Requires patient `id`, other fields are optional.  
    * Only provided fields will be updated.
    * 
    * @param patientData patient id and updated information.
    * @returns Updated patient.
    */
    async update(patientData: {

        id: string, 
        email?: string,
        password?: string
        firstname?: string
        lastname?: string  
        address?: string
        phonenumber: string 

    }): Promise<Patient> {

        const repository = getRepository(Patient)
        
        // Find pateint account by id: 
        const patient = await repository.findOne(patientData)
        if(!patient)
            throw ApiError.NotFound('Pateint not found')

        // Update fields:
        if(patientData.email)
            patient.email = patientData.email
        
        if(patientData.password)
            patient.password = await bcrypt.hash(patientData.password, 10)
        
        if(patientData.firstname)
            patient.firstName = patientData.firstname
            
        if(patientData.lastname)
            patient.lastName = patientData.lastname

        if(patientData.address)
            patient.address = patientData.address
        
        if(patientData.phonenumber)
            patient.phoneNumber = patientData.phonenumber

        // Save data to data base
        const updated = await repository.save(patient)

        return {...updated, password: ''}
    },

      /**
    * Finds patient accounts in the database that match given conditions.
    * 
    * @param searchBy Search condition (optional).
    * @param offset Search offset (optional).
    * @param limit Maximum number of profiles to be returned (optional, default 100).
    * @returns Array of found patient accounts.
    */
   async find(searchBy?: 
    {
      firstName?: string,
      lastName?: string

   }, offset = 0, limit = 100): Promise<Patient[]> 
   {
      const repository = getRepository(Patient)

      const patients = await repository.find({
         select: ['id', 'firstName', 'lastName', 'email', 'phoneNumber'],
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit
      })

      if (!patients || !patients.length) 
        throw ApiError.NotFound(`No patient profiles were found`)

      return patients
   },

    /**
    * Finds one (first matching) patient account in the database.
    * 
    * @param searchBy Search condition.
    * @returns Found patient.
    */
     async findOne(searchBy?: { id?: string, email?: string }): Promise<Patient> 
     {
        const repository = getRepository(Patient)
  
        // Find one patient account that matches searchBy condition
        // and select only the specified columns
        const patient = await repository.findOne({
           select: ['id', 'firstName', 'lastName', 'email', 'role'],
           where: searchBy
        })
  
        if (!patient) 
            throw ApiError.NotFound('Patient account not found')
  
        // No need to reset password, because we didn't specify it in select, so it'll be empty
        return patient
     },

     /**
    * Finds patient account by credentials.
    * 
    * @param email patient's email.
    * @param password patient's password.
    * @returns Found patient account.
    */
    async findByCredentials(email: string, password: string): Promise<Patient> 
    {
        const repository = getRepository(Patient)

        // Find patient by email first:
        const patient = await repository.findOne({ email })
        if (!patient) 
            throw ApiError.NotFound('Patient account not found')

        // Now compare passwords:
        const passwordsMatch = await bcrypt.compare(password, patient.password)
        if (!passwordsMatch)
            throw ApiError.NotFound('Patient account not found')

        // If everything matches, return patient account:
        return { ...patient, password: '' }
    },


    /**
    * Removes specified patient account from the database.
    * @param id Patient id.
    * @returns Removed patient.
    */
    async remove(id: string): Promise<Patient> 
    {
        const repository = getRepository(Patient)

        // Find patient account in the database by id:
        const patient = await repository.findOne(id)
        if (!patient) throw ApiError.NotFound('Patient account not found')

        // Delete found patient account:
        await repository.remove(patient)

        return { ...patient, password: '' }
    }
}
