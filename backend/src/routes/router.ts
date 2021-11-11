import express from 'express'
import { MainController } from '../controllers/main-controller'

/**
 * Provides routing for the whole API.
 */
export const router = express.Router()

// Main:
router.get('/ping', MainController.ping)
