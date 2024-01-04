import { Request, Response } from 'express';
import { loginUser, registerNewUser } from '../Services/AuthService'

export const registerController = async ({ body }: Request, res: Response) => {
  const response = await registerNewUser(body)
  res.send(response)
}

export const loginController = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  const response = await loginUser({ email, password })
  
  res.send(response)
}