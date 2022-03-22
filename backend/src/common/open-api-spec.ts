import jsdoc from 'swagger-jsdoc'
import { VERSION, SESSION_COOKIE } from './constants'

const options: jsdoc.Options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'MyCheckUp API',
         version: VERSION,
      },
      components: {
         securitySchemes: {
            cookieAuth: {
               type: 'apiKey',
               in: 'cookie',
               name: SESSION_COOKIE,
            },
         },
      },
   },
   apis: ['./dist/routes/*.js'],
}

export const openApiSpec = jsdoc(options)
