import type { Response, Request } from "express";
import type UserAuthRequest from "../Interfaces/utils.js";
import { collections } from "../services/databaseService.js";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";
import type { User } from "../Interfaces/collectionsInterfaces.js";
import { Code } from "../enums/code.enum.js";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";

export const GetUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) }) as User
        res.status(Code.OK).send(new HttpResponse<User>(Code.OK, Status.OK, 'Usuário encontrado', user))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const GetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await collections.users?.find().toArray() as User[]
        res.status(Code.OK).send(new HttpResponse<User[]>(Code.OK, Status.OK, 'Todos os usuários encontrados', users))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        await collections.users?.deleteOne({ _id: new ObjectId(userId) })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'usuário deletado com sucesso'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const EditUser = async (req: Request, res: Response) => {
    try {
        const { userId, image, description, username } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, {
            $set: {
                description,
                image,
                username
            }
        })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'usuário editado com sucesso'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const ChangePassword =  async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { password: hashPassword }})
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'Senha Alterada'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const ChangeUsername = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { username } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { username } })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'Username alterado'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const ChangeDescription = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { description } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { description } })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'Descrição alterada'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const ChangeImage = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { image } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { image } })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, 'Imagem alterada'))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}