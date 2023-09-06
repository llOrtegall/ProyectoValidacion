import { connection2 } from '../db.js'

export const getClientes = async (req, res) => {
  const [result] = await connection2.query('SELECT * FROM cliente')
  res.json(result[0])
}

export const createCliente = (req, res) => {
  res.send('Creando los Clientes')
}

export const updateCliente = (req, res) => {
  res.send('Actualizando los Clientes')
}

export const deleteCliente = (req, res) => {
  res.send('Borrando los Clientes')
}
