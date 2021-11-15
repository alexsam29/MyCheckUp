import { getRepository } from 'typeorm'
import { Admin } from '../models/admin'
import { Role } from '../models/role'
import { ApiError } from '../exceptions/api-error'

/**
 * 
 */
export const AdminService = {
   /**
    * Finds admins in the database that match given conditions.
    * 
    * @param searchBy Search condition.
    * @param offset Search offset.
    * @param limit Maximum number of profiles to be returned.
    * @returns Array of `Admin` model objects.
    */
   async find(searchBy?: {
      firstName?: string,
      lastName?: string,
      role?: Role
   }, offset = 0, limit = 100): Promise<Admin[]> {
      const repo = getRepository(Admin)

      const admins = await repo.find({
         select: ['id', 'firstName', 'lastName', 'email'],
         where: searchBy,
         order: { createdAt: 'DESC' },
         skip: offset,
         take: limit
      })

      if (!admins || !admins.length) throw ApiError.NotFound(`No admin profiles were found`)

      return admins
   }
}
