import { Router } from 'express'
import { connection } from '../db.js'

const router = Router()

// TODO: Trae todos los datos en la base de datos en un objeto JSON
router.get('/ping', async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.json(result)
})

export default router
