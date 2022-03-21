import nodemailer from 'nodemailer'
import { logger } from './logger'

export const mailTransport = async () => {
   const testAccount = await nodemailer.createTestAccount()

   logger.debug(`User: ${testAccount.user}\nPass: ${testAccount.pass}`)

   const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
         user: testAccount.user,
         pass: testAccount.pass,
      },
   })

   return transport
}
