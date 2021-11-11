import '@types/jest'
import express from 'express'
import request from 'supertest'
import { router } from '../../src/routes/router'
import { notFoundHandler } from '../../src/middleware/not-found-handler'
import { errorHandler } from '../../src/middleware/error-handler'

const app = express()
app.use(router)
app.use(notFoundHandler)
app.use(errorHandler)

describe('Basic API Functionality Test Suite:', () => {
   it('GET /ping - success', async () => {
      const { body, statusCode } = await request(app).get('/ping')
      expect(body).toEqual({ success: true })
      expect(statusCode).toEqual(200)
   })
})
