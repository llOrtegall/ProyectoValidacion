import { obtenerFechaActual, separarNombre } from '../../../client/src/services/funtionsReutilizables.js'
import { validateClientUser } from '../../schemas/userSchema.js'
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
  const { dia, mes, ano } = obtenerFechaActual()
  const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(nombre)
  const result = validateClientUser({ nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula })

  if (!result.success) {
    return res.status(400).json({ error: result.error.message })
  }

  console.log(result.data)

  try {
    const result = await connectOraDb.execute(`Insert into GAMBLE.CLIENTES (DOCUMENTO,TOTALPUNTOS,USUARIO,FECHASYS,NOMBRES,APELLIDO1,APELLIDO2,FECHANACIMIENTO,TELEFONO,DIRECCION,TIPO_DEPTO,CODDEPTO,TIPO_MUNICIPIO,CODMUNICIPIO,ENT_SEXO,DAT_DTO_SEXO,DOCALTERNO,NRO_FAVORITO,
      VERSION,CCOSTO,MAIL,NOMBRE1,NOMBRE2,CELULAR,ACEPTAPOLITICATDP,CLIENTEVENDEDOR,CLAVECANAL,TPOTRT_CODIGO_NACION,TRT_CODIGO_NACION,TPOTRT_CODIGO_EXPDOC,TRT_CODIGO_EXPDOC,FECHAEXPDOC,DTO_CODIGO_TPDOC,ENT_CODIGO_TPDOC,IDLOGIN,SECURITY_TOKEN) 
      values ('${cedula}','u+#ajÕ','JBOSS',to_date('${dia}/${mes}/${ano}','DD/MM/RR'),'${nombre1} ${nombre2}','${apellido1}','${apellido2}',to_date('27/01/81','DD/MM/RR'),'${telefono}','','6','30','8','965','60','33','&DOCUMENTO','00000','0','0','${correo}',null,null,null,null,null,'101010',null,null,null,null,null,null,null,null,null)`)

    await connectOraDb.commit()

    if (result.rowsAffected === 1) {
      res.status(201).json({ success: true, message: 'Commit successfully committed', user: 'Usuario Creado' })
    } else {
      res.status(500).json({ success: false, message: 'Commit failed committed', user: 'Usuario No Creado' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Commit error committed', err: error })
    console.log(error)
  }
}
