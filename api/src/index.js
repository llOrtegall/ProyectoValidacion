import express from 'express'
import { connect } from 'mongoose'
import env from 'dotenv'

env.config()

const PORT = process.env.PORT
const app = express()

connect(process.env.MONGO_URI)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
