import express from 'express'
import { routerUser } from './routes/users.routes.js'
import { routerCliente } from './routes/clientes.routes.js'

const app = express()
const PORT = 3000

// TODO: routerUser para consultar la bd chatboot
app.use(routerUser)
// TODO: routerCliente para consultar la bd Produccion
app.use(routerCliente)

app.listen(PORT, () => {
  console.log(`Server On Port http://localhost:${PORT}`)
})
