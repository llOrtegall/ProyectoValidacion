import { ItemModel } from '../Models/Item.Model'
import { Item } from '../Interfaces/Item.interface'

export const inserItem = async (item: Item) => {
  const responseInsert = await ItemModel.create(item)
  return responseInsert
}
