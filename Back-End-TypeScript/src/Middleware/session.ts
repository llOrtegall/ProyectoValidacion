import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.handle';
import { JwtPayload } from 'jsonwebtoken';

interface RequestExt extends Request {
  user?: string | JwtPayload
}

export const chekJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop()
    const isUser = verifyToken(`${jwt}`);

    if (!isUser) {
      res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = isUser;
    console.log(jwt);
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}