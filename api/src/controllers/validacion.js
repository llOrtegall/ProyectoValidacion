import { connection } from '../db.js'

export const getValidacion = async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}
