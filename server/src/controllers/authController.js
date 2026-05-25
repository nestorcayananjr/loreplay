import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { verifyPassword } from "../utils/verifyPassword.js";
import { createJWT } from "../utils/createJWT.js";

const authController = {
    createUser: async (req, res) => {
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
            res.locals.status = 500;
            res.locals.user = error.message;

            return res.json(error.message).status(500)
        }
    },

    verifyUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            
            const user = await prisma.user.findFirst({
                where: {
                    username
                },
            })

            if (!user) throw new Error("Bad Request")
            const verified = await verifyPassword(password, user.passwordHash)
            if (!verified) throw new Error("Bad Request")

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
            return res.json(error.message).status(400)
        }
    }
    
}

export default authController