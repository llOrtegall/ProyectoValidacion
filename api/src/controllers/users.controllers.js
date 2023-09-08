import { connection } from '../db.js'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

const JWT_SECRET = 'hjduytqorpkcmvnfhagqwtvquritoyklasdwqweru'

export const getTest = async (req, res) => {
  res.status(200).json('Test Ok ¡¡¡')
}

export const getUsers = async (req, res) => {
  const token = req.cookies?.token
  if (token) {
    jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
      if (err) throw err
      res.json(userData)
    })
  } else {
    res.status(401).json('No Token Sorry')
  }
}

export const getLogin = async (req, res) => {
  const { username, password } = req.body

  const [result] = await connection.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${username}'`)

  if (result.length > 0) {
    const UserLogin = result.find((i) => i.username)

    if (UserLogin.password === password) {
      const id = UserLogin.id
      const name = UserLogin.nombres

      // TODO: Creamos el JsonWebToken
      jwt.sign({ id, name, username }, JWT_SECRET, {}, (err, token) => {
        if (err) throw err
        res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(202).json({
          id
        })
      })
    } else {
      res.status(401).json('Contraseña No Valida')
    }
  } else {
    res.status(401).json('Error Al Iniciar Sesion Usuario No Encontrado')
  }
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
