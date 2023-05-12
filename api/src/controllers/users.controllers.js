import { connectMysql } from "../db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from "dotenv";

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10)

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

  const { user, password } = req.body
  const [result] = await connectMysql.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${user}'`)

  if (result.length > 0) {
    const userData = result.find((i) => i)
    const { username, password: passDb, id, nombres, apellidos } = userData
    const passOk = bcrypt.compareSync(password, passDb)
    if (passOk) {
      jwt.sign({ id, username, nombres, apellidos }, JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err
        res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(202).json({
          id, username, nombres, apellidos
        })
      })
    } else {
      res.status(401).json('Contraseña Incorrecta')
    }
  } else {
    res.status(400).json('Usuario No Encontrado')
  }
}

// TODO: /register
export const createUser = async (req, res) => {

  const { names, document, lastNames } = req.body

  const username = `CP${document}`
  const pass = `CP${document.slice(-3)}`
  const hashedPassword = bcrypt.hashSync(pass, bcryptSalt)

  const [result] = await connectMysql.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${names}'`)

  // TODO valida si el usuario ya existe
  if (!result.length > 0) {
    const [UserCreado] = await connectMysql.query(`INSERT INTO login (username, password, nombres, apellidos) VALUES ('${username}', '${hashedPassword}', '${names} ', '${lastNames} ')`)

    //TODO: si el usuario es creado correctamente genera el token
    if (UserCreado.affectedRows === 1) {
      const [result] = await connectMysql.query(`SELECT BIN_TO_UUID(id) id, username, password, nombres, apellidos FROM login WHERE username = '${username}'`)

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
      res.status(400).json('Error Al Crear El Usuario')
    }
  } else {
    res.status(406).json('Error Al Registrarse El Usuario Ya Existe')
  }
}

export const updateUser = (req, res) => {
  res.send('Actualizando los usuarios')
}

export const deleteUser = (req, res) => {
  res.send('Borrando los usuarios')
}
