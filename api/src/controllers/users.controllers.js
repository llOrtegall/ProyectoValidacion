import { connection } from '../db.js'

export const getUsers = async (req, res) => {
  const [result] = await connection.query('SELECT * FROM personayumbo')
  res.json(result)
}

export const createUser = (req, res) => {
  res.send('Creando los usuarios')
}

export const updateUser = (req, res) => {
  res.send('Actualizando los usuarios')
}

export const deleteUser = (req, res) => {
  res.send('Borrando los usuarios')
}

export const getLogin = async (req, res) => {
  const { username, password } = req.body

  const [result] = await connection.query(`SELECT username, password FROM login WHERE username = '${username}'`)
  const user = result.find((i) => i.username)

  if (user.username === username && user.password === password) {
    res.status(201).json('Login Ok')
  } else {
    res.status(401).json({ message: 'Usuario o Contraseña No valida' })
  }
}
