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
  const { username } = req.body

  const [result] = await connection.query(`SELECT username, password FROM login WHERE username = '${username}'`)
  const user = result.find((i) => i.username)
  if (user.username === username) {
    console.log('TODO VA BIEN')
    res.send('TODO VA BIEN')
  }
}
