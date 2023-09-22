import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { routerCliente } from './routes/clientes.routes.js'
import { routerValidacion } from './routes/validacion.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 3000

app.use(cors({
  credentials: true,
  origin: '*'
}))
app.use(cookieParser())
app.use(express.json())
// TODO: routerUser para consultar la bd chatboot
app.use(routerUser)
// TODO: routerCliente para consultar la bd Produccion
app.use(routerCliente)
// TODO: routerValidación para realizar la validación
app.use(routerValidacion)

app.listen(PORT, () => {
  console.log(`Server On Port http://localhost:${PORT}`)
})
