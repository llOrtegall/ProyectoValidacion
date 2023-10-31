import { validateUser } from '../../schemas/userSchema.js'
import { connectMysql } from '../db.js'

// TODO: trae los clientes registrados en x chatBoot
export const getClientes = async (req, res) => {
  const [result] = await connectMysql.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}

// TODO: trae 1 cliente registrado en chatBoot con la cedula
export const getClient = async (req, res) => {
  const { documento } = req.body

  const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula=${documento}`)
  res.status(200).json(result)
}

// TODO: Función que actualiza el cliente en Chat Boot
export const updateCliente = async (req, res) => {
  const result = validateUser(req.body.userObject)

  console.log(result)

  //* Valida las variables tipos y si llegan vacias
  if (result.success === false) {
    return res.status(400).json({ error: result.error.message })
  } else {
    // * Destructuración de JS
    const { names1, names2, names3, names4, tel, email, documen } = result.data

    //* UNIFICA LAS VARIABLES PARA ACTUALIZAR EN chat boot
    const names = `${names1} ${names2} ${names3} ${names4}`
    const nombresInsert = names.toUpperCase()

    // TODO: Realizamos un Try_Cath para ejecutar las sentencias SQL
    try {
      //* Primero verifica si el usuario que queremos actualizar Existe en la base de Datos
      const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula = ${documen}`)
      if (result.length > 0) {
        // TODO: Función Que Actualizar El Usuario
        const [result2] = await connectMysql.query(`UPDATE personayumbo SET nombre='${nombresInsert}', telefono='${tel}', correo='${email}' WHERE cedula = '${documen}'`)
        res.status(200).json(result2)
      } else {
        res.status(500).json(result)
      }
    } catch (error) {
      // TODO: Retornará un Error en caso de que falle se la inyección SQL
      res.status(500).json({ error })
    }
  }
}
