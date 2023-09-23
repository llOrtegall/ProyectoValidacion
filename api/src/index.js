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
  origin: 'http://localhost:5173'
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

// import { getConnection } from 'oracledb'
// import dotenv from 'dotenv'
// dotenv.config()

// const config = {
//   user: process.env.USER_NAME,
//   password: process.env.PASS_WORD,
//   connectString: process.env.CONECT_STRING,
//   externalAuth: false,
// }
// async function getEmployee() {
//   let conn
//   try {
//     conn = await getConnection(config)
//     const result = await conn.execute(
//       'select * from gamble.clientes WHERE DOCUMENTO=31206266;'
//     )
//     console.log(result.rows[0])
//   } catch (err) {
//     console.log('Ouch!', err)
//   } finally {
//     if (conn) { // conn assignment worked, need to close
//       await conn.close()
//     }
//   }
// }

// getEmployee()