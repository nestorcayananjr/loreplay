import bcrypt from 'bcrypt'
import 'dotenv/config'

export const verifyPassword = async (password, hashedPassword) => {
    const verified = await bcrypt.compare(password, hashedPassword)
    return verified
}