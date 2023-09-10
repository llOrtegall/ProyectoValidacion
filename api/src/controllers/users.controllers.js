import { connection } from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = 'hjduytqorpkcmvnfhagqwtvquritoyklasdwqweru'
const bcryptSalt = bcrypt.genSaltSync(10)

export const getTest = async (req, res) => {
  res.status(200).json('Test Ok ¡¡¡')
}

// TODO: /profile
export const getUsers = async (req, res) => {
  const token = req.cookies?.token
  if (token) {
    jwt.verify(token, JWT_SECRET, { expiresIn: '5h' }, (err, userData) => {
      if (err) throw err
      res.json(userData)
    })
  } else {
    res.status(401).json('No Token')
  }
}

// TODO: /login
export const getLogin = async (req, res) => {
  const { username, password } = req.body

  const [result] = await connection.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${username}'`)

  if (username) {
    const userData = result.find((i) => i)
    const { username, password: passDb, id, nombres, apellidos } = userData

    const passOk = bcrypt.compareSync(password, passDb)
    if (passOk) {
      jwt.sign({ id, username, nombres, apellidos }, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err
        res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(201).json({
          id, username, nombres, apellidos
        })
      })
    }
  }
}

// TODO: /register
export const createUser = async (req, res) => {
  const { cedula, name, apellidos } = req.body

  const userName = `CP${cedula}`
  const passWord = `CP${cedula.slice(-3)}`
  const hashedPassword = bcrypt.hashSync(passWord, bcryptSalt)

  const [result] = await connection.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${userName}'`)

  if (!result.length > 0) {
    const [UserCreado] = await connection.query(`INSERT INTO login (username, password, nombres, apellidos) VALUES ('${userName}', '${hashedPassword}', '${name} ', '${apellidos} ')`)

    if (UserCreado.affectedRows === 1) {
      const [result] = await connection.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${userName}'`)

      // eslint-disable-next-line no-useless-catch
      try {
        const userData = result.find((i) => i)
        const { id, username, nombres, apellidos } = userData

        jwt.sign({ id, username, nombres, apellidos }, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
          if (err) throw err
          res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(201).json({
            id, username, nombres, apellidos
          })
        })
      } catch (error) {
        throw error
      }
    } else {
      res.status(401).json('Error Al Generar El Token')
    }
  } else {
    res.status(401).json('Error Al Iniciar Sesion Usuario Ya Existe')
  }
}

export const updateUser = (req, res) => {
  res.send('Actualizando los usuarios')
}

export const deleteUser = (req, res) => {
  res.send('Borrando los usuarios')
}
