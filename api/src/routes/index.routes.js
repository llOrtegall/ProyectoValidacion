import { Router } from 'express'
import { ping } from '../controllers/index.controlller.js'

const router = Router()

// TODO: Trae todos los datos en la base de datos en un objeto JSON
router.get('/ping', ping)

export default router
