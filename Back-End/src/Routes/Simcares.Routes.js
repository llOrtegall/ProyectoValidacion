import { Router } from 'express'
import { createSimcard, getSimcard, getSimcards, getSimcardWhitBodega } from '../Controllers/Simcard.Controllers.js'

export const SimcardsMongoDB = Router()

SimcardsMongoDB.get('/simcard', getSimcards)

SimcardsMongoDB.get('/simcard/:id', getSimcard)

SimcardsMongoDB.post('/createSimcard', createSimcard)

SimcardsMongoDB.get('/simcardWhitBodega', getSimcardWhitBodega)
