import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { openApiSpec } from '../common/open-api-spec'

export const RootRouter = express.Router()

/**
 * @openapi
 * /:
 *   get:
 *     summary: home page
 *     tags:
 *       - Root
 *     description: Returns an HTML documentation for the API.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/html:
 *             schema:
 *               example: HTML
 */
RootRouter.get('/', swaggerUi.setup(openApiSpec))
