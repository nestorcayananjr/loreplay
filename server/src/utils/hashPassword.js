import bcrypt from 'bcrypt'
import 'dotenv/config'

export const hashPassword = async (password) => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}