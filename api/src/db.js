import { createPool } from 'mysql2/promise'
import oracledb from 'oracledb'

oracledb.initOracleClient({ libDir: 'C:/instantclient_11_2' });

// TODO: Creando la conecxión dataUsers
export const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'datauser'
})

// TODO: Creando la conecxión a bd Clientes
export const conecOracDB = await oracledb.getConnection({
  user: "INSERTACLIENTES",
  password: '01e8dc3934',  // contains the hr schema password
  connectString: "172.20.1.174:1521/demopb"
})
