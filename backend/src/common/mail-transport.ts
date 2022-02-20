import nodemailer from 'nodemailer'

export const mailTransport = async () => {
   const testAccount = await nodemailer.createTestAccount()
   const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
         user: testAccount.user,
         pass: testAccount.pass
      }
   })
   
   return transport
}
