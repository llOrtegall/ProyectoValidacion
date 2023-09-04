import express from 'express'
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()
const PORT = 3000

app.use(usersRoutes)
app.use(indexRoutes)

app.listen(PORT)
