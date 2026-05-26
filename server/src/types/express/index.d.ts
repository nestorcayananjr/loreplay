import { SafeUser } from '../your-types-file'
import { User } from "@prisma/client"

type SafeUser = Pick<User, 'id' | 'email' | 'username'>

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser
    }
  }
}