import { ItemModel } from '../Models/Item.Model'
import { Item } from '../Interfaces/Item.interface'

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