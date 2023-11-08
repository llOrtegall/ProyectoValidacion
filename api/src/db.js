import { createPool } from 'mysql2/promise'
import env from 'dotenv'
import oracledb from 'oracledb'

oracledb.initOracleClient({ libDir: '/opt/oracle/instantclient_11_2' })
env.config()

// TODO: Creando la conecxión Mysql
export const connectMysql = createPool({
  host: process.env.HOSTMYSQL,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  port: process.env.PUERTO,
  database: process.env.NAME_DATABASE
})

// TODO: Creando la conecxión a bd Clientes
export const connectOraDb = await oracledb.getConnection({
  user: process.env.USER_NAME,
  password: process.env.PASS_WORD, // contains the hr schema password
  connectString: process.env.CONECT_STRING
})
