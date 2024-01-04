import { ItemModel } from '../Models/Item.Model'
import { Bodega } from '../Interfaces/Bodega.Interface'

export const insertBodegaSer = async (bodega: Bodega) => {
  const responseInsert = await ItemModel.create(bodega)  
  return responseInsert
}

export const getBodegasSer = async () => {
  const responseItems = await ItemModel.find({})
  return responseItems
}

export const getBodegaSer = async (sucursal: String) => {
  const responseItem = await ItemModel.findOne({ sucursal });
  return responseItem
}

export const updateBodegaSer = async (sucursal: String, data: Bodega) => {
  const responseItem = await ItemModel.findOneAndUpdate({ sucursal }, data, { new: true, runValidators: true });
  return responseItem
}

export const deleteBodegaSer = async (placa: String) => {
  const responseItem = await ItemModel.findOneAndDelete({ placa });
  return responseItem
}