import express, { Router } from "express";
import { ChangeDescription, ChangeImage, ChangePassword, ChangeUsername, GetUser } from "../controlers/userController";

const userRouter = Router()
userRouter.use(express.json())

userRouter.get('/get-user', GetUser)
userRouter.put('/change-password', ChangePassword)
userRouter.put('/change-description', ChangeDescription)
userRouter.put('/change-username', ChangeUsername)
userRouter.put('/change-image', ChangeImage)


export default userRouter