import { Router } from 'express'
import { getUser, createUser, deleteUser, updateUser, getLogin } from '../controllers/users.controllers.js'

export const routerUser = Router()

routerUser.post('/login', getLogin)

routerUser.get('/profile', getUser)

routerUser.post('/register', createUser) // http://localhost:3000/register

routerUser.put('/user', deleteUser)

routerUser.delete('/user', updateUser)
