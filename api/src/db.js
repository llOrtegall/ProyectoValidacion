import { createPool } from 'mysql2/promise'

// TODO: Creando la conecxión dataUsers
export const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'datauser'
})

// TODO: Creando la conecxión a bd Clientes
export const connection2 = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'clientes'
})
