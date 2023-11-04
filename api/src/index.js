import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { chatBootClient } from './routes/chatBoot.routes.js'
import { routerCF } from './routes/clienteFiel.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

const app = express()
const PORT = process.env.PUERTO_API || 4000

app.disable('x-powered-by')

dotenv.config()
app.use(cors(
  {
    origin: process.env.ORIGENES_ACCES,
    credentials: true
  }
))

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Ok Test')
})

// TODO: Metodos Cliente Fiel
app.use(routerCF)

// TODO: Metodos En Chat Boot DB
app.use(chatBootClient)

// TODO: Metodos En Usuarios Login
app.use(routerUser)

app.listen(PORT, () => {
  console.log(`Server Iniciado En El Puerto http://localhost:${PORT}`)
})
