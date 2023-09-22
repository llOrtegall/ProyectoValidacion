import { connectMysql } from '../db.js'

//TODO: trae los clientes registrados en x chatBoot
export const getClientes = async (req, res) => {
  const [result] = await connectMysql.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}

//TODO: trae 1 cliente registrado en chatBoot con la cedula
export const getClient = async (req, res) => {
  const { documento } = req.body

  const [result] = await connectMysql.query(`SELECT * FROM personayumbo where cedula=${documento}`)
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
