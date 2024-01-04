import { Schema, model } from 'mongoose'
import { Item } from '../Interfaces/Item.interface'

const enumNombre = ['Computador', 'Monitor', 'Teclado', 'Mouse', 'Impresora', 'Portatil'];

const ItemSchema = new Schema<Item>(
  {
    nombre: { type: String, required: [true, 'El nombre es requerido.'], enum: enumNombre},
    descripcion: { type: String, required: [true, 'La descripción es requerida.'] },
    placa: {
      type: String, required: [true, 'La placa es requerida.'], unique: true,
      validate: {
        validator: function (v: string) {
          return /^(MA-|MI-)\d{4,}$/.test(v);
        },
        message: props => `${props.value} no es una placa válida. Debe comenzar con 'MA-' o 'MI-' seguido de al menos 4 números.`
      }
    },
    serial: { type: String, required: [true, 'El serial es requerido.'], unique: true },
    estado: { type: String, required: [true, 'El estado es requerido.'], enum: ['Nuevo', 'Bueno', 'Malo', 'Baja'] }
  }, { timestamps: true, versionKey: false }
);

export const ItemModel = model('Items', ItemSchema);