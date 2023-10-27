import { connectMysql } from '../db.js'

//TODO: trae los clientes registrados en x chatBoot
export const getClientes = async (req, res) => {
  const [result] = await connectMysql.query('SELECT * FROM personayumbo')
  res.status(202).json(result)
}

//TODO: trae 1 cliente registrado en chatBoot con la cedula
export const getClient = async (req, res) => {
  const { documento } = req.body

  const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula=${documento}`)
  res.status(200).json(result)
}

// TODO: Función que actualiza el cliente en Chat Boot
export const updateCliente = async (req, res) => {

  console.log(req.body);

  // * Recibe todas las variables necesarias para hacer el insert 
  const { apellido1, apellido2, nombre1, nombre2, nombre_1, nombre_2, apellido_1, apellido_2, tel, email, cedula, telefono, correo } = req.body

  //* Verifica si las variables están vacias toma el valor anterior y solo actualizar las que tengan cambios
  const nombre_1ok = nombre_1 === '' ? nombre1 : nombre_1
  const nombre_2ok = nombre_2 === '' ? nombre2 : nombre_2
  const apellido_1ok = apellido_1 === '' ? apellido1 : apellido_1
  const apellido_2ok = apellido_2 === '' ? apellido2 : apellido_2
  const sendTel = tel === '' ? telefono : tel
  const sendEmail = email === '' ? correo : email

  //* UNIFICA LAS VARIABLES PARA ACTUALIZAR EN chat boot
  const names = `${apellido_1ok} ${apellido_2ok} ${nombre_2ok} ${nombre_1ok}`
  const nombresInsert = names.toUpperCase();

  //TODO: Realizamos un Try_Cath para ejecutar las sentencias SQL
  try {
    //* Primero verifica si el usuario que queremos actualizar Existe en la base de Datos
    const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula = ${cedula}`)
    if (result.length > 0) {
      // TODO: Función Que Actualizar El Usuario 
      const [result2] = await connectMysql.query(`UPDATE personayumbo SET nombre='${nombresInsert}', telefono='${sendTel}', correo='${sendEmail}' WHERE cedula = '${cedula}'`)
      res.status(200).json(result2)
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    //TODO: Retornará un Error en caso de que falle se la inyección SQL
    res.status(500).json('Usuario No Actualizados Intente De Nuevo')
  }
}

