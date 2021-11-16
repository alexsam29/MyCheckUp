import express from 'express'
import request from 'supertest'
import { router } from '../../src/routes/router'
import { notFoundHandler } from '../../src/middleware/not-found-handler'
import { errorHandler } from '../../src/middleware/error-handler'

const app = express()
app.use(router)
app.use(notFoundHandler)
app.use(errorHandler)

describe('Main API End-Points Test Suite:', () => {
   it('GET / - root end-point', async () => {
      const { statusCode } = await request(app).get('/')
      expect(statusCode).toEqual(200)
   })

   it('GET /ping - success', async () => {
      const { body, statusCode } = await request(app).get('/ping')
      expect(body).toEqual({ success: true })
      expect(statusCode).toEqual(200)
   })

   it('GET /abcd - nonexistent', async () => {
      const { body, statusCode } = await request(app).get('/abcd')
      expect(body).toEqual({ error: 'Requested resource not found' })
      expect(statusCode).toEqual(404)
   })
})

