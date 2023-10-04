import { connection } from '../db.js'

export const getClientes = async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}

export const getClient = async (req, res) => {
  const documento = req.body
  console.log(documento);

  const [result] = await connection.query(`SELECT * FROM personayumbo where cedula=${documento.documento}`)
  res.status(200).json(result)
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
