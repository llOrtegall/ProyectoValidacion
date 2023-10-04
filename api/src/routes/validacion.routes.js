import { Router } from 'express'
import { getValidacion } from '../controllers/validacion.js'

export const routerValidacion = Router()

routerValidacion.get('/validacion', getValidacion)
