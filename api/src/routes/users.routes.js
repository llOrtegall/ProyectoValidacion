import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser, getLogin } from '../controllers/users.controllers.js'

export const routerUser = Router()

routerUser.post('/login', getLogin)

routerUser.get('/users', getUsers)

routerUser.post('/user', createUser)

routerUser.put('/user', deleteUser)

routerUser.delete('/user', updateUser)
