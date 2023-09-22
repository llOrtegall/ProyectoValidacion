import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { chatBootClient } from './routes/chatBoot.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { routerUserAdmin } from './routes/userCreate.routes.js'
import dotenv from "dotenv";

const app = express()
const PORT = 3000
dotenv.config()
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use(express.json())
// TODO: routerUser para consultar la bd chatboot
app.use(routerUser)

// TODO: Metodos En Chat Boot DB
app.use(chatBootClient)

// TODO: routerValidación para realizar la validación
app.use(routerUserAdmin)

app.listen(PORT, () => {
  console.log(`Server On Port http://localhost:${PORT}`)
})
