import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError'
import { Request, Response, NextFunction } from "express";
import { User } from '@prisma/client';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  console.log('')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  try {
      if (!token) {
        throw new AppError('No token provided', 401)
      }
    
      jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
        if (err) {
          throw new AppError('Invalid or expired token', 403)
        }
    
        req.user = decoded as User;
        next()
      })
  } catch (error) {
    next(error)
  }
}