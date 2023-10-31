import { connectOraDb } from '../db.js'

export const getClientFiel = async (req, res) => {
  const { cc } = req.body
  const result = await connectOraDb.execute(`SELECT * FROM gamble.clientes WHERE documento = '${cc}'`)
  if (result.rows.length === 1) {
    res.status(200).json({ user: `${cc}`, Estado: 'Si Existe' })
  } else {
    res.status(404).json({ user: `${cc}`, Estado: 'No Existe' })
  }
}

export const createdClientFiel = async (req, res) => {
  const { cedula, nombre, telefono, correo } = req.body

  const palabras = nombre.split(' ')

  switch (palabras.length) {
    case 2:
      var apellido1 = palabras[0]
      var apellido2 = ''
      var nombre1 = palabras[1]
      var nombre2 = ''
      break
    case 3:
      var apellido1 = palabras[0]
      var apellido2 = palabras[1]
      var nombre1 = palabras[2]
      var nombre2 = ''
      break
    case 4:
      var apellido1 = palabras[0]
      var apellido2 = palabras[1]
      var nombre1 = palabras[2]
      var nombre2 = palabras[3]
      break
    default:
      console.log('Número de palabras en el nombre no coincide con los casos esperados.')
  }

  const nombres = `${nombre1} ${nombre2}`

  try {
    const result = await connectOraDb.execute(`INSERT INTO gamble.clientes (DOCUMENTO, TOTALPUNTOS, USUARIO, FECHASYS, NOMBRES, APELLIDO1, APELLIDO2, FECHANACIMIENTO, TELEFONO, DIRECCION, TIPO_DEPTO, CODDEPTO,TIPO_MUNICIPIO, CODMUNICIPIO, ENT_SEXO, DAT_DTO_SEXO, DOCALTERNO, NRO_FAVORITO, VERSION, CCOSTO, MAIL, NOMBRE1, NOMBRE2, CELULAR, ACEPTAPOLITICATDP, CLIENTEVENDEDOR, CLAVECANAL, TPOTRT_CODIGO_NACION, TRT_CODIGO_NACION, TPOTRT_CODIGO_EXPDOC, TRT_CODIGO_EXPDOC, FECHAEXPDOC, DTO_CODIGO_TPDOC, ENT_CODIGO_TPDOC, IDLOGIN, SECURITY_TOKEN)
      VALUES
      ('${cedula}', 'u+#ajÕ', 'JBOSS', to_date('27/06/18','DD/MM/RR'), '${nombres} ${nombre2}', '${apellido1}', '${apellido2}', to_date('27/01/81','DD/MM/RR'), '${telefono}', '', '6', '30', '8', '965', '60', '33', '66910151', '00000', '0' ,'0', '${correo}', null, null, null, null, null, '101010', null, null, null, null, null, null, null, null, null)`)

    await connectOraDb.commit()

    if (result.rowsAffected === 1) {
      res.status(201).json({ success: true, message: 'Commit successfully committed', user: 'Created' })
    } else {
      res.status(500).json({ success: false, message: 'Commit failed committed', user: 'No Created' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Commit error committed' })
    console.error('Error al insertar datos:', error)
  }
}
