import fs from 'fs/promises'
import path from 'path'
import { AdminService } from '../services/admin-service'

/**
 * Admin account representation in the JSON file.
 */
interface Admin {
   email: string
   password: string
   firstName: string
   lastName: string
}

/**
 * Saves admin accounts from the file to the database.
 */
export const setAdmin = async () => {
   const fileData = await fs.readFile(
      path.join(__dirname, '../../.deployment/admin.json'),
      'utf-8'
   )
   const admins: Admin[] = JSON.parse(fileData)

   if (admins.length) {
      for (const admin of admins) {
         await AdminService.create({
            email: admin.email,
            password: admin.password,
            firstName: admin.firstName,
            lastName: admin.lastName,
         })
      }
   }

   await fs.unlink(path.join(__dirname, '../../.deployment/admin.json'))
}
