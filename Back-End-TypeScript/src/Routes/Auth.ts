import { Router } from "express";
import { loginController, registerController } from '../Controllers/Auth'

export const router = Router();

router.post('/register', registerController)

router.post('/login', loginController)