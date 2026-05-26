import bcrypt from 'bcrypt'
import 'dotenv/config'

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const verified = await bcrypt.compare(password, hashedPassword)
    return verified
}