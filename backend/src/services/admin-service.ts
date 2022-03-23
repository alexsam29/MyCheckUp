import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { Admin } from '../models/admin'
import { Role } from '../models/role'
import { ApiError } from '../exceptions/api-error'

/**
 * Handles business logic for `Admin` model.
 */
export const AdminService = {
   /**
    * Adds new admin to the database.
    *
    * @param adminDto New admin information.
    * @returns Created admin.
    */
   async create(adminDto: {
      email: string
      password: string
      firstName: string
      lastName: string
   }): Promise<Admin> {
      const repository = getRepository(Admin)

      // Check if email already exists:
      const found = await repository.findOne({ email: adminDto.email })
      if (found)
         throw ApiError.BadRequest('Admin account with this email already exists')

      // Create new Admin with information that we received:
      const newAdmin = new Admin()
      newAdmin.email = adminDto.email
      newAdmin.password = await bcrypt.hash(adminDto.password, 10)
      newAdmin.firstName = adminDto.firstName
      newAdmin.lastName = adminDto.lastName
      newAdmin.role = Role.ADMIN
      newAdmin.active = true

      // Save (insert) new Admin in the database:
      const created = await repository.save(newAdmin)

      // Return created Admin object but make the password property empty
      // There is no need for Front-end to know the hashed password
      return { ...created, password: '' }
   },

   /**
    * Updates admin account in the database.
    * Requires admin `id`, other fields are optional.
    * Only provided fields will be updated.
    *
    * @param adminDto Admin id and updated information.
    * @returns Updated admin.
    */
   async update(adminDto: {
      id: string
      email?: string
      password?: string
      firstName?: string
      lastName?: string
   }): Promise<Admin> {
      const repository = getRepository(Admin)

      // Find admin account by id:
      const admin = await repository.findOne(adminDto.id)
      if (!admin) throw ApiError.NotFound('Admin not found')

      // Updated provided fields:
      if (adminDto.email) admin.email = adminDto.email
      if (adminDto.password)
         admin.password = await bcrypt.hash(adminDto.password, 10)
      if (adminDto.firstName) admin.firstName = adminDto.firstName
      if (adminDto.lastName) admin.lastName = adminDto.lastName

      // Save updated information to the database:
      const updated = await repository.save(admin)

      return { ...updated, password: '' }
   },

   /**
    * Finds admin accounts in the database that match given conditions.
    *
    * @param searchBy Search condition (optional).
    * @param offset Search offset (optional).
    * @param limit Maximum number of profiles to be returned (optional, default 100).
    * @returns Array of found admin accounts.
    */
   async find(
      searchBy?: {
         firstName?: string
         lastName?: string
      },
      offset = 0,
      limit = 100
   ): Promise<Admin[]> {
      const repository = getRepository(Admin)

      const admins = await repository.find({
         select: ['id', 'firstName', 'lastName', 'email'],
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit,
      })

      if (!admins || !admins.length)
         throw ApiError.NotFound(`No admin profiles were found`)

      return admins
   },

   /**
    * Finds one (first matching) admin account in the database.
    *
    * @param searchBy Search condition.
    * @returns Found admin.
    */
   async findOne(searchBy?: { id?: string; email?: string }): Promise<Admin> {
      const repository = getRepository(Admin)

      // Find one admin account that matches searchBy condition
      // and select only the specified columns
      const admin = await repository.findOne({
         select: ['id', 'firstName', 'lastName', 'email', 'role'],
         where: searchBy,
      })

      if (!admin) throw ApiError.NotFound('Admin account not found')

      // No need to reset password, because we didn't specify it in select, so it'll be empty
      return admin
   },

   /**
    * Finds admin account by credentials.
    *
    * @param email Admin's email.
    * @param password Admin's password.
    * @returns Found admin account.
    */
   async findByCredentials(email: string, password: string): Promise<Admin> {
      const repository = getRepository(Admin)

      // Find admin by email first:
      const admin = await repository.findOne({ email })
      if (!admin) throw ApiError.NotFound('Admin account not found')

      // Now compare passwords:
      const passwordsMatch = await bcrypt.compare(password, admin.password)
      if (!passwordsMatch) throw ApiError.NotFound('Admin account not found')

      // If everything matches, return admin account:
      return { ...admin, password: '' }
   },

   /**
    * Removes specified admin account from the database.
    *
    * @param id Admin id.
    * @returns Removed admin.
    */
   async remove(id: string): Promise<Admin> {
      const repository = getRepository(Admin)

      // Find Admin account in the database by id:
      const admin = await repository.findOne(id)
      if (!admin) throw ApiError.NotFound('Admin account not found')

      // Delete found Admin account:
      await repository.remove(admin)

      return { ...admin, password: '' }
   },
}
