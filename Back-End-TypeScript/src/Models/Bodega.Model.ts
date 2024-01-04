import { Schema, model } from 'mongoose'
import { Bodega } from '../Interfaces/Bodega.Interface'

const BodegaSchema = new Schema<Bodega>(
  {
    nombre: { type: String, required: [true, 'El nombre es requerido.'] },
    sucursal: { type: String, required: [true, 'La sucursal es requerida.'], unique: true },
    direccion: { type: String, required: [true, 'La dirección es requerida.'] },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
  }, { timestamps: true, versionKey: false }
);

export const BodegaModel = model('Bodega', BodegaSchema)