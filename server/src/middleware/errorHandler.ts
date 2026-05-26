import { Request, Response, NextFunction } from "express"
import AppError from "../utils/AppError"

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  res.status(statusCode).json({
    status: 'error',
    message
  })
}

export default errorHandler