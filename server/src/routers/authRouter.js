import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', authController.createUser)
authRouter.post('/login', authController.verifyUser)

export default authRouter