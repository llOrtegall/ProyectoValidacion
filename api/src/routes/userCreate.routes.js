import { Router } from 'express'
import { userCreated, CreateUserclient, validarDian } from '../controllers/userCreated.js'


export const routerUserAdmin = Router()

routerUserAdmin.post('/validarDian', validarDian)

routerUserAdmin.post('/validarUsuario', userCreated)

routerUserAdmin.post('/insertarCliente', CreateUserclient)