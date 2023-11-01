import { validateUser } from '../../schemas/userSchema.js'
import { connectMysql } from '../db.js'

// TODO: trae los clientes registrados en x chatBoot
export const getClientes = async (req, res) => {
  const [result] = await connectMysql.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}

// TODO: trae 1 cliente registrado en chatBoot con la cedula
export const getClient = async (req, res) => {
  const { cc } = req.body
  try {
    const [result] = await connectMysql.query('SELECT * FROM personayumbo WHERE cedula = ?', [cc])
    if (result.length > 0) {
      res.status(200).json(result[0])
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

// TODO: Función que actualiza el cliente en Chat Boot
export const updateCliente = async (req, res) => {
  const result = validateUser(req.body.userObject)

  if (!result.success) {
    return res.status(400).json({ error: result.error.message })
  }

  const { names1, names2, names3, names4, tel, email, documen } = result.data

  const names = `${names1} ${names2} ${names3} ${names4}`
  const nombresInsert = names.toUpperCase()

  try {
    const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula='${documen}'`)

    if (result.length > 0) {
      const query = `UPDATE personayumbo SET nombre='${nombresInsert}', telefono='${tel}', correo='${email}' WHERE cedula='${documen}'`
      const [result2] = await connectMysql.query(query)
      res.status(200).json(result2)
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
