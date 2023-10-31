import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { chatBootClient } from './routes/chatBoot.routes.js'
import { routerCF } from './routes/clienteFiel.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'

const app = express()
const PORT = 3000
dotenv.config()
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:4200']
}))
app.use(cookieParser())
app.use(express.json())

app.get('http://localhost:3000', (req, res) => {
  res.status(200).send('Ok Test')
})

// TODO: Metodos Cliente Fiel
app.use(routerCF)

// TODO: Metodos En Chat Boot DB
app.use(chatBootClient)

// TODO: Metodos En Usuarios Login
app.use(routerUser)

app.listen(PORT, () => {
  console.log(`Server On Port http://localhost:${PORT}`)
})
