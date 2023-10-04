import { Router } from 'express'
import { userCreated } from '../controllers/validacion.js'

export const routerValidacion = Router()

routerValidacion.post('/validacion', userCreated)
