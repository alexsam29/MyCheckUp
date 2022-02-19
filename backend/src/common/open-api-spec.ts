import jsdoc from 'swagger-jsdoc'
import { VERSION } from './constants'

const options: jsdoc.Options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'MyCheckUp API',
         version: VERSION,
      },
      components: {
         securitySchemes: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT'
            }
         }
      }
   },
   apis: ['./dist/routes/*.js']
}

export const openApiSpec = jsdoc(options)
