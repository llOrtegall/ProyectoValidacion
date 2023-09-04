import { createPool } from 'mysql2/promise'

// TODO: Creando la conecxión
export const connection = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'datauser'
})
