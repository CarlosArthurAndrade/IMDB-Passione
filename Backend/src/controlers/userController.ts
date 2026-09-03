import { Response, Request } from "express";
import UserAuthRequest from "../Interfaces/utils";
import { collections } from "../services/databaseService";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";

export const GetUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) })
        res.status(200).send(user)
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const ChangePassword =  async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { password: hashPassword }})
        res.status(200).send({ message: 'Senha alterada' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const ChangeUsername = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { username } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { username } })
        res.status(200).send({ message: 'Username alterado com sucesso' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const ChangeDescription = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { description } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { description } })
        res.status(200).send({ message: 'Descrição alterada com sucesso' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const ChangeImage = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user
        const { image } = req.body
        await collections.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { image } })
        res.status(200).send({ message: 'Imagem alterada com sucesso' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}