import { conecOracDB } from '../db.js'


export const userCreated = async (req, res) => {
  const consultarCedula = req.body.cedula

  // TODO: Esta es la data desde Cliente Fiel
  const result = await conecOracDB.execute(`select * from gamble.clientes where documento=${consultarCedula}`);

  if (result.rows?.length > 0) {
    if (result.rows[0][0] === consultarCedula) {
      res.status(200).json({ 'user': true })
    }
  } else {
    res.status(200).json({ 'user': false })
  }

}

export const CreateUserclient = async (req, res) => {
  const user = req.body

  const insert = await conecOracDB.execute(`insert into gamble.clientes (DOCUMENTO,TOTALPUNTOS,USUARIO,FECHASYS,NOMBRES,APELLIDO1,APELLIDO2,FECHANACIMIENTO,TELEFONO,DIRECCION,TIPO_DEPTO,CODDEPTO,TIPO_MUNICIPIO,CODMUNICIPIO,ENT_SEXO,DAT_DTO_SEXO,DOCALTERNO,NRO_FAVORITO,VERSION,CCOSTO,MAIL,NOMBRE1,NOMBRE2,CELULAR,ACEPTAPOLITICATDP,CLIENTEVENDEDOR,CLAVECANAL,TPOTRT_CODIGO_NACION,TRT_CODIGO_NACION,TPOTRT_CODIGO_EXPDOC,TRT_CODIGO_EXPDOC,FECHAEXPDOC,DTO_CODIGO_TPDOC,ENT_CODIGO_TPDOC,IDLOGIN,SECURITY_TOKEN) values ('${user.cedula}','0000','JBOSS',to_date('27/06/18','DD/MM/RR'),'${user.name}','${user.name2}','${user.lastName}', to_date('27/01/81','DD/MM/RR'),'${user.telefono}','','6','30','8','965','60','33','66910151','00000','0','0','${user.email}',null,null,null,null,null,'101010',null,null,null,null,null,null,null,null,null)`)

  res.status(203)
  console.log(insert.rowsAffected);

}