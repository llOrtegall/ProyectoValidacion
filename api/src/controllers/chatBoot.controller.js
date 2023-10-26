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


export const updateCliente = async (req, res) => {
  console.log(req.body);

  const { names, tel, email, cedula, nombre, telefono, correo } = req.body

  console.log(names, tel, email);


  const sendNames = names === '' ? nombre : names
  const sendTel = tel === '' ? telefono : tel
  const sendEmail = email === '' ? correo : email

  console.log(sendNames, sendTel, sendEmail);

  try {
    const [result] = await connectMysql.query(`SELECT * FROM personayumbo WHERE cedula = ${cedula}`)
    if (result.length > 0) {
      console.log('Hace El update');

      const [result2] = await connectMysql.query(`UPDATE personayumbo SET nombre='${sendNames}', telefono='${sendTel}', correo='${sendEmail}' WHERE cedula = '${cedula}'`)
      res.status(200).json(result2)
    }
  } catch (error) {
    console.log(error);
  }
}

