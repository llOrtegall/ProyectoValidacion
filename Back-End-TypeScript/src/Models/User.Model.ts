import { Schema, model, } from 'mongoose'
import { User } from '../Interfaces/User.Interface';

const UserSchema = new Schema<User>({
  name: { type: String, required: [true, 'El nombre es requerido.'] },
  description: { type: String, default: 'Sin descripción.' },
  email: {
    type: String, required: [true, 'El correo es requerido.'], unique: true
  },
  password: { type: String, required: [true, 'La contraseña es requerida.'] }
}, { timestamps: true, versionKey: false });

export const UserModel = model('Users', UserSchema);