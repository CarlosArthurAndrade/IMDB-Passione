import crypto from "crypto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import type { Request, Response } from "express";
import { collections } from "../services/databaseService.js";
import type { Token, User } from '../Interfaces/collectionsInterfaces.js'
import { CreateResetEmail } from "../utils/sendEmail.js";
import { ObjectId } from "mongodb";
import { Code } from "../enums/code.enum.js";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const findUser = await collections.users?.findOne({ email }, { collation: { locale: 'pt', strength: 2} }) as User
        if(await bcrypt.compare(password, findUser.password)){
            const token = jwt.sign({id: findUser._id }, process.env.CHAVE_SECRETA_JWT || 'Chave Secreta', { expiresIn: '3h' })
            return res.status(Code.OK).send(new HttpResponse<string>(Code.OK, Status.OK, 'Usuário encontrado', token))
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Email ou senha incorretos'))
        }
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const Register = async (req: Request, res: Response) => {
    try {
        const { email, password, username, description, image } = req.body
        const findUser = await collections.users?.findOne({ $or: [{ email }, { username }]}, { collation: { locale: 'pt', strength: 2} }) as User
        if(!findUser){
            const hashPassword = await bcrypt.hash(password, 10)
            await collections.users?.insertOne({ username, email, password: hashPassword, description, image })
            return res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, "Usuário cadastrado com sucesso!"))
        }
        return res.status(Code.CONFLICT).send(new HttpResponse(Code.CONFLICT, Status.CONFLICT, 'Email ou usuário já cadastrados'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const SendResetEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await collections.users?.findOne({ email }, { collation: { locale: 'pt', strength: 2} })
        if(user){
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
            await collections.tokens?.insertOne({ userId: new ObjectId(user._id), tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) })
            await CreateResetEmail(email, token)
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "Se o email existir o link será enviado"))
        } else {
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "Se o email existir o link será enviado"))
        }
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
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
        res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Senha alterada'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}