import express from 'express'
import env from 'dotenv'

env.config()

const app = express()
const PORT = process.env.PORT || 3080

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT + '/')
})
