import { Router } from 'express'
import { deleteCliente, getClientes, getClient } from '../controllers/chatBoot.controller.js'

export const chatBootClient = Router()

chatBootClient.get('/clientes', getClientes)

chatBootClient.post('/cliente', getClient)

chatBootClient.delete('/cliente', deleteCliente)
