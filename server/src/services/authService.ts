import { User } from '@prisma/client'
import prisma from '../lib/prisma'
import AppError from '../utils/AppError'
import { hashPassword } from '../utils/hashPassword'
import { verifyPassword } from '../utils/verifyPassword'

interface RegisterInput {
    email: string,
    username: string,
    password: string
}

interface LoginInput {
    username: string,
    password: string
}

type SafeUser = Omit<User, 'passwordHash'>

export const registerUser = async (data: RegisterInput): Promise<SafeUser> => {
    const { username, password, email } = data

    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })

    if (existingUser) throw new AppError('Invalid username or password', 409)

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            passwordHash: hashedPassword
        },
        select: {
            email: true,
            username: true,
            id: true,
            createdAt: true
        }
    })

    return newUser;
}

export const loginUser = async (data: LoginInput): Promise<SafeUser> => {
    const { username, password } = data

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const verified = await verifyPassword(password, user.passwordHash)

    if (!verified) {
        throw new AppError('Invalid credentials', 401)
    }

    return user
}