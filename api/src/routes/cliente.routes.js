import { Router } from 'express'
import { createCliente, deleteCliente, getClientes, updateCliente } from '../controllers/cliente.controller.js'

export const routerCliente = Router()

routerCliente.get('/clientes', getClientes)

routerCliente.post('/cliente', updateCliente)

routerCliente.put('/cliente', createCliente)

routerCliente.delete('/cliente', deleteCliente)
