import { Router } from 'express'
import { getValidacion, newValidacion } from '../controllers/validacion.js'

export const routerValidacion = Router()

routerValidacion.get('/validacion', getValidacion)

routerValidacion.post('/notificar', newValidacion)