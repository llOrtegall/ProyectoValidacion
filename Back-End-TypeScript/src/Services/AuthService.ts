import { Auth } from "../Interfaces/Auth.Interface"
import { User } from "../Interfaces/User.Interface"
import { UserModel } from '../Models/User.Model'
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle"

export const registerNewUser = async ({ email, password, name }: User) => {
  const checkUser = await UserModel.findOne({ email })
  if (checkUser) return { error: 'El usuario ya existe.' }

  const passHash = await encrypt(password) // TODO: 123456 

  const registerNewUser = await UserModel.create({ email, password: passHash, name })
  return registerNewUser
}

export const loginUser = async ({ email, password }: Auth) => {
  const checkUser = await UserModel.findOne({ email })
  if (!checkUser) return { error: 'El usuario No Existe.' }

  const passHasBD = checkUser.password
  const passIsOk = await verified(password, passHasBD)

  if (!passIsOk) return { error: 'Contraseña Incorrecta.' }

  const token = generateToken(checkUser.email)

  const data = {
    token,
    user: checkUser
  }

  return data
}