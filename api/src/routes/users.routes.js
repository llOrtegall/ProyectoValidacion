import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser, getLogin, getTest } from '../controllers/users.controllers.js'

export const routerUser = Router()

routerUser.get('/test', getTest)

routerUser.post('/login', getLogin)

routerUser.get('/profile', getUsers)

routerUser.post('/register', createUser)

routerUser.put('/user', deleteUser)

routerUser.delete('/user', updateUser)
