import { Response } from "express";

export const handleHttp = (res:Response, error: string, errorRaw?: any) => {
 
  if(errorRaw && errorRaw.message) {
    return res.status(400).json({ error: errorRaw.message })
  }

  if(errorRaw && errorRaw.errors && errorRaw.errors.nombre && errorRaw.errors.nombre.properties) {
    const properties = errorRaw.errors.nombre.properties;
    return res.status(400).json({ error: properties.message, value: `Valor Recibido: ${properties.value}` })
  }
  
  // TODO: Error para propiedades duplicadas
  if( errorRaw && errorRaw.code === 11000 ) {
    const key = Object.keys(errorRaw.keyValue)[0];
    const value = errorRaw.keyValue[key];
    return res.status(400).json({ error: `Ya Existe Un item Con Propiedad => ${key}: ${value}` })
  }
  
  // TODO: Error para placa
  if (errorRaw && errorRaw.errors && errorRaw.errors.placa && errorRaw.errors.placa.properties) {
    const properties = errorRaw.errors.placa.properties;
    return res.status(400).json({ error: properties.message, value: `Valor Recibido: ${properties.value}` })
  }

  res.status(500).json({ error })
}