import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { chatBootClient } from './routes/chatBoot.routes.js'
import { routerCF } from './routes/clienteFiel.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

const app = express()

app.disable('x-powered-by')

dotenv.config()
app.use(cors(
  {
    origin: ['http://localhost:5173', 'http://localhost:8080'],
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

app.listen(4000, () => {
  console.log('Server On Port http://localhost:4000')
})
