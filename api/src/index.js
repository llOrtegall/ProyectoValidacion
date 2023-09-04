import express from 'express'
import { connection } from './db.js'

const app = express()
const PORT = 3000

// TODO: Trae todos los datos en la base de datos en un objeto JSON
app.get('/ping', async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.json(result)
})

app.get('/users', (req, res) => {
  res.send('obteniendo los usuarios')
})

app.post('/users', (req, res) => {
  res.send('Creando empleados')
})

app.put('/users', (req, res) => {
  res.send('actualizando empleados')
})

app.delete('/users', (req, res) => {
  res.send('elimando empleados')
})

app.listen(PORT)
