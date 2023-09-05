import express from 'express'

const app = express()
const PORT = 3000

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
