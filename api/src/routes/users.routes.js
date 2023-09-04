import { Router } from 'express'

const router = Router()

router.get('/users', (req, res) => {
  res.send('obteniendo los usuarios')
})

router.post('/users', (req, res) => {
  res.send('Creando empleados')
})

router.put('/users', (req, res) => {
  res.send('actualizando empleados')
})

router.delete('/users', (req, res) => {
  res.send('elimando empleados')
})

export default router
