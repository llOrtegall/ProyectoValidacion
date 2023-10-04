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

// async function run() {
//   const connection = await oracledb.getConnection({
//     user: "INSERTACLIENTES",
//     password: '01e8dc3934',  // contains the hr schema password
//     connectString: "172.20.1.174:1521/demopb"
//   });

//   const result = await connection.execute(`select * from gamble.clientes where documento=29974550`);
//   console.log("Result is:", result.rows);

//   await connection.close();   // Always close connections
// }

// run();