import { ItemModel } from '../Models/Item.Model'
import { Item } from '../Interfaces/Item.Interface'

export const inserItemSer = async (item: Item) => {
  const responseInsert = await ItemModel.create(item)  
  return responseInsert
}

export const getItemsSer = async () => {
  const responseItems = await ItemModel.find({})
  return responseItems
}

export const getItemSer = async (placa: String) => {
  const responseItem = await ItemModel.findOne({ placa });
  return responseItem
}

export const updateItemSer = async (placa: String, data: Item) => {
  const responseItem = await ItemModel.findOneAndUpdate({ placa }, data, { new: true, runValidators: true });
  return responseItem
}

export const deleteItemSer = async (placa: String) => {
  const responseItem = await ItemModel.findOneAndDelete({ placa });
  return responseItem
}