import { conecOracDB } from '../db.js'

export const userCreated = async (req, res) => {

  const cedulas = req.body;

  const results = [];

  for (const cedula of cedulas) {
    const result = await conecOracDB.execute(`SELECT * FROM gamble.clientes WHERE documento = '${cedula}'`);
    results.push(result);
  }

  const response = cedulas.map((cedula, index) => ({
    cedula,
    userCreated: results[index].rows?.length > 0
  }));

  res.status(200).json(response);
}

export const CreateUserclient = async (req, res) => {

  // { //TODO: Estructura Objecto Inicial
  //   "nombre": "Andres",
  //   "nombre2": "Felipe",
  //   "apellido": "Izquierdo",
  //   "apellido2": "Saya",
  //   "documento": "1114345243",
  //   "celular": "324 546 6577"
  // }

  const user = req.body;

  try {

    const { nombre, nombre2, apellido, apellido2, documento, celular } = user

    const result = await conecOracDB.execute(`INSERT INTO gamble.clientes 
    (DOCUMENTO, TOTALPUNTOS, USUARIO, FECHASYS, NOMBRES, APELLIDO1, APELLIDO2, FECHANACIMIENTO, 
    TELEFONO, DIRECCION, TIPO_DEPTO, CODDEPTO,TIPO_MUNICIPIO, CODMUNICIPIO, ENT_SEXO, DAT_DTO_SEXO, 
    DOCALTERNO, NRO_FAVORITO, VERSION, CCOSTO, MAIL, NOMBRE1, NOMBRE2, CELULAR, 
    ACEPTAPOLITICATDP, CLIENTEVENDEDOR, CLAVECANAL, TPOTRT_CODIGO_NACION, TRT_CODIGO_NACION, TPOTRT_CODIGO_EXPDOC, TRT_CODIGO_EXPDOC, 
    FECHAEXPDOC, DTO_CODIGO_TPDOC, ENT_CODIGO_TPDOC, IDLOGIN, SECURITY_TOKEN) 
    VALUES 
    ('${documento}', '0000', 'JBOSS', to_date('27/06/18','DD/MM/RR'), '${nombre}', '${apellido}', '${apellido2}', to_date('27/01/81','DD/MM/RR'),
    '${celular}', '', '6', '30', '8', '965', '60', '33', '66910151', '00000', '0' ,'0', '', null, null, null, null, null, '101010', null, null, null, null, null, null, null, null, null)`);

    await conecOracDB.commit();
    res.status(201).json({ 'success': true, 'message': 'Commit successfully committed' })

  } catch (error) {
    res.status(500).json({ 'success': false, 'message': 'Commit error committed' })
    console.error('Error al insertar datos:', error);
  }
}