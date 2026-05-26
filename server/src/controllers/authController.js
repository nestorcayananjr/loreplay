import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { verifyPassword } from "../utils/verifyPassword.js";
import { createJWT } from "../utils/createJWT.js";
import AppError from "../utils/appError.js";
import { registerUser, loginUser }  from "../services/authService.ts"

const authController = {
    createUser: async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const newUser = await registerUser(email, username, password)
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
            const user = await loginUser(username, password)
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