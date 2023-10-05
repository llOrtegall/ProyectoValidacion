import { Router } from 'express'
import { deleteCliente, getClientes, getClient } from '../controllers/cliente.controller.js'

export const routerCliente = Router()

routerCliente.get('/clientes', getClientes)

routerCliente.post('/cliente', getClient)

routerCliente.delete('/cliente', deleteCliente)
