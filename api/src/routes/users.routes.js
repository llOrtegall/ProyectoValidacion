import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser, getLogin } from '../controllers/users.controllers.js'

export const routerUser = Router()

routerUser.post('/login', getLogin)

routerUser.get('/profile', getUsers)

routerUser.post('/register', createUser)

routerUser.put('/user', deleteUser)

routerUser.delete('/user', updateUser)
