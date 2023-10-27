import { connectOraDb } from '../db.js'

export const getClientFiel = async (req, res) => {
  const { cc } = req.body
  try {
    const result = await connectOraDb.execute(`SELECT * FROM gamble.clientes WHERE documento = '${cc}'`);
    if (result.rows.length === 1) {
      res.status(200).json({ "user": `${cc}`, "Estado": "Si Existe" })
    } else {
      res.status(404).json({ "user": `${cc}`, "Estado": "No Existe" })
    }
  } catch (error) {
    throw error;
  }
}

export const createdClientFiel = async (req, res) => {

  const user = req.body;

  console.log(req.body);

  const { nombre1, nombre2, apellido1, apellido2, documento, celular } = user

  // try {
  //   const result = await connectOraDb.execute(`INSERT INTO gamble.clientes
  //   (DOCUMENTO, TOTALPUNTOS, USUARIO, FECHASYS, NOMBRES, APELLIDO1, APELLIDO2, FECHANACIMIENTO,
  //   TELEFONO, DIRECCION, TIPO_DEPTO, CODDEPTO,TIPO_MUNICIPIO, CODMUNICIPIO, ENT_SEXO, DAT_DTO_SEXO,
  //   DOCALTERNO, NRO_FAVORITO, VERSION, CCOSTO, MAIL, NOMBRE1, NOMBRE2, CELULAR,
  //   ACEPTAPOLITICATDP, CLIENTEVENDEDOR, CLAVECANAL, TPOTRT_CODIGO_NACION, TRT_CODIGO_NACION, TPOTRT_CODIGO_EXPDOC, TRT_CODIGO_EXPDOC,
  //   FECHAEXPDOC, DTO_CODIGO_TPDOC, ENT_CODIGO_TPDOC, IDLOGIN, SECURITY_TOKEN)
  //   VALUES
  //   ('${documento}', '0000', 'JBOSS', to_date('27/06/18','DD/MM/RR'), '${nombre1} ${nombre2}', '${apellido1}', '${apellido2}', to_date('27/01/81','DD/MM/RR'),
  //   '${celular}', '', '6', '30', '8', '965', '60', '33', '66910151', '00000', '0' ,'0', '', null, null, null, null, null, '101010', null, null, null, null, null, null, null, null, null)`);

  //   await connectOraDb.commit();

  //   if (result.rowsAffected === 1) {
  //     res.status(201).json({ 'success': true, 'message': 'Commit successfully committed', "user": "Created" })
  //   } else {
  //     res.status(500).json({ 'success': false, 'message': 'Commit failed committed', "user": "No Created" })
  //   }
  // } catch (error) {
  //   res.status(500).json({ 'success': false, 'message': 'Commit error committed' })
  //   console.error('Error al insertar datos:', error);
  // }
}