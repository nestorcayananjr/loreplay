import jwt from 'jsonwebtoken'
import AppError from '../utils/appError'

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  try {
      if (!token) {
        throw new AppError('No token provided', 401)
      }
    
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new AppError('Invalid or expired token', 403)
        }
    
        req.user = decoded;
        next()
      })
  } catch (error) {
    next(error)
  }
}