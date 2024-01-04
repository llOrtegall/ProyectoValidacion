import "dotenv/config"
import express from 'express'
import cors from 'cors'

import { router } from './Routes/Index'
import { connectMongo } from './config/Mongo'
const PORT = process.env.PORT || 3010
const app = express()

app.use(cors())
app.use(express.json())

app.use(router)
connectMongo().then(() => console.log('MongoDB Connected'))
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))