import { createJWT } from "../utils/createJWT";
import { registerUser, loginUser }  from "../services/authService.js"
import { Request, Response, NextFunction } from "express";

const authController = {
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, username, password } = req.body;
            const newUser = await registerUser({email, username, password})
            const token = createJWT(newUser.email, newUser.username, newUser.id)

            return res.json({
                message: 'User Created Successfully',
                user: newUser,
                token
            }).status(201)
        } catch (error) {
            next(error)
        }
    },

    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            const user = await loginUser({username, password})
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