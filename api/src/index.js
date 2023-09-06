import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { routerCliente } from './routes/cliente.routes.js'

const app = express()
const PORT = 3000

app.use(routerUser)
app.use(routerCliente)

app.listen(PORT)
