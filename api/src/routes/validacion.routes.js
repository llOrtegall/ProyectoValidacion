import { Router } from 'express'
import { getValidacion } from '../controllers/validacion.js'

export const routerUser = Router()

routerUser.get('/validacion', getValidacion)
