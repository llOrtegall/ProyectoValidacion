import { Router } from 'express'
import { userCreated, CreateUserclient } from '../controllers/userCreated.js'


export const routerUserAdmin = Router()

routerUserAdmin.post('/validacion', userCreated)

routerUserAdmin.post('/insertarCliente', CreateUserclient)