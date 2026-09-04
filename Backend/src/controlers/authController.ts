import crypto from "crypto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import type { Request, Response } from "express";
import { collections } from "../services/databaseService.js";
import type { Token, User } from '../Interfaces/collectionsInterfaces.js'
import { CreateResetEmail } from "../utils/sendEmail.js";
import { ObjectId } from "mongodb";


export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const findUser = await collections.users?.findOne({ email }) as User
        if(await bcrypt.compare(password, findUser.password)){
            const token = jwt.sign({id: findUser._id }, process.env.CHAVE_SECRETA_JWT || 'Chave Secreta', { expiresIn: '3h' })
            return res.status(200).send({ token })
        } else {
            return res.status(400).send({ message: 'Email ou senha incorretos' })
        }
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const Register = async (req: Request, res: Response) => {
    try {
        const { email, password, username, description, image } = req.body
        const findUser = await collections.users?.findOne({ $or: [{ email }, { username }]}) as User
        if(!findUser){
            const hashPassword = await bcrypt.hash(password, 10)
            await collections.users?.insertOne({ username, email, password: hashPassword, description, image })
            return res.status(200).send({ message: "Usuário cadastrado com sucesso!" })
        }
        if(findUser.email === email) {
            return res.status(400).send({ message: 'Email já cadastrado'})
        } else {
            return res.status(400).send({ message: 'Username já cadastrado'})
        }
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const SendResetEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await collections.users?.findOne({ email })
        if(user){
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
            await collections.tokens?.insertOne({ userId: new ObjectId(user._id), tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) })
            CreateResetEmail(email, token)
            return res.status(200).send({ message: "Se o email existir o link será enviado" })
        } else {
            return res.status(200).send({ message: "Se o email existir o link será enviado" })
        }
    } catch (error: unknown) {
        return res.status(500).send({ error });
    }
}

export const ResetUserPassword =  async (req: Request, res: Response) => {
    try {
        const { password, token } = req.body
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const savedToken = await collections.tokens?.findOne({ tokenHash }) as Token
        const hashPassword = await bcrypt.hash(password, 10)
        await collections.users?.updateOne({ _id: new ObjectId(savedToken.userId) }, { $set: { password: hashPassword }})
        await collections.tokens?.deleteOne({ tokenHash })
        res.status(200).send({ message: 'Senha alterada' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}