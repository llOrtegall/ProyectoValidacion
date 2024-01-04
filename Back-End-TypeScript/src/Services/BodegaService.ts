import { BodegaModel } from '../Models/Bodega.Model'
import { Bodega } from '../Interfaces/Bodega.Interface'
import { ItemModel } from '../Models/Item.Model'

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

export const addItemToBodegaSer = async (sucursal: String, itemId: string) => {
  const item = await ItemModel.findById(itemId);
  const bodega = await BodegaModel.findOne({ sucursal });
  if (item === null) {
    throw new Error('Item No Encontrado');
  }
  if (bodega === null) {
    throw new Error('Bodega No Encontrada');
  }

  if (bodega.items.includes(item._id)) {
    throw new Error('Item Ya Existe En Bodega');
  }

  const otherBodegaWithItem = await BodegaModel.findOne({ items: itemId });
  if (otherBodegaWithItem) {
    throw new Error('El item ya existe en otra bodega');
  }

  const responseItem = await BodegaModel.findOneAndUpdate({ sucursal }, { $push: { items: item } }, { new: true, runValidators: true });
  return responseItem
}