import { BodegaModel } from '../Models/Bodega.Model'
import { Bodega } from '../Interfaces/Bodega.Interface'

export const insertBodegaSer = async (bodega: Bodega) => {
  const responseInsert = await BodegaModel.create(bodega)  
  return responseInsert
}

export const getBodegasSer = async () => {
  const responseBodegas = await BodegaModel.find({})
  return responseBodegas
}

export const getBodegaSer = async (sucursal: String) => {
  const responseItem = await BodegaModel.findOne({ sucursal });
  return responseItem
}

export const updateBodegaSer = async (sucursal: String, data: Bodega) => {
  const responseItem = await BodegaModel.findOneAndUpdate({ sucursal }, data, { new: true, runValidators: true });
  return responseItem
}

export const deleteBodegaSer = async (sucursal: String) => {
  const responseItem = await BodegaModel.findOneAndDelete({ sucursal });
  return responseItem
}