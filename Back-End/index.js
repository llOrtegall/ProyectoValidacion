import { ItemsMongoDB } from './src/Routes/Items.Routes.js'
import { BodegasMongoDB } from './src/Routes/Bodegas.Routes.js'

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { MovimientosMongoDB } from './src/Routes/Movimientos.Routes.js'

dotenv.config()

const ACCEPTED_ORIGINS = [
  'http://172.20.1.160',
  'http://localhost:5173',
  'http://172.20.1.110:5173'
]

const app = express()
app.disable('x-powered-by')
const PORT = process.env.PUERTO_API || 4000

app.use(cors({ origin: ACCEPTED_ORIGINS }))
app.use(morgan('dev'))
app.use(express.json())

app.use(ItemsMongoDB)
app.use(BodegasMongoDB)
app.use(MovimientosMongoDB)

app.listen(PORT, () => {
  console.log(`Server Iniciado En El Puerto http://localhost:${PORT}`)
})
