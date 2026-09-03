import express, { Router } from "express";
import { Login, Register, ResetUserPassword, SendResetEmail } from "../controlers/authController";

const authRouter = Router()
authRouter.use(express.json())

authRouter.post('/login', Login)
authRouter.post('/register', Register)
authRouter.post('/send-reset-email', SendResetEmail)
authRouter.post('/reset-password', ResetUserPassword)

export default authRouter;