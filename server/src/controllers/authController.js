import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { verifyPassword } from "../utils/verifyPassword.js";
import { createJWT } from "../utils/createJWT.js";
import AppError from "../utils/appError.js";

const authController = {
    createUser: async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const hashedPassword = await hashPassword(password);

            const newUser = await prisma.user.create({
                data: {
                    email,
                    username,
                    passwordHash: hashedPassword
                },
                select: {
                    email: true,
                    username: true
                }
            })

            const token = createJWT(newUser.email, newUser.username)

            return res.json({
                message: 'User Created Successfully',
                user: newUser,
                token
            }).status(201)
        } catch (error) {
            next(error)
        }
    },

    verifyUser: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            console.log(username, password)
            
            const user = await prisma.user.findFirst({
                where: {
                    username
                },
            })

            if (!user) throw new AppError('Wrong username or password', 401)
            const verified = await verifyPassword(password, user.passwordHash)
            if (!verified) throw new AppError('Wrong username or password', 401)

            const token = createJWT(user.email, user.username, user.id)

            return res.json({
                message: 'Login successful',
                user: {
                    user: user.username,
                    email: user.email
                },
                token
            }).status(200)
        } catch (error){
            next(error)
        }
    }
    
}

export default authController