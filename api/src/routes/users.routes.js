import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser } from '../controllers/users.controllers.js'

const router = Router()

router.get('/users', getUsers)

router.post('/users', createUser)

router.put('/users', deleteUser)

router.delete('/users', updateUser)

export default router
