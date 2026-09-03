import { Response, Request } from "express";
import { collections } from "../services/databaseService";
import { Requests, User } from "../Interfaces/collectionsInterfaces";
import UserAuthRequest from "../Interfaces/utils";
import { CreateRequestEmail, DeleteRequesttEmail } from "../utils/sendEmail";
import { ObjectId } from "mongodb";

export const GetRequests = async (_req: Request, res: Response) => {
    try {
        const requests = await collections.requests?.find().toArray() as Requests[]
        res.status(200).send(requests)    
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const AddRequest = async (req: Request, res: Response) => {
    try {
        const { title, description, releaseYear } = req.body
        const userId  = (req as UserAuthRequest).user
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) }, { projection: { email: 1 }}) as User
        await collections.requests?.insertOne({
            userId: new ObjectId(userId),
            title,
            description,
            releaseYear
        })
        await CreateRequestEmail(user.email, title)
        res.status(200).send({ message: "Request adicionado com sucesso"})    
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const EditRequest = async (req: Request, res: Response) => {
    try {
        const { title, description, releaseYear } = req.body
        const userId  = (req as UserAuthRequest).user
        await collections.requests?.updateOne({ userId }, {
            userId,
            title,
            description,
            releaseYear
        })
        res.status(200).send({ message: 'Pedido alterado com sucesso!' })    
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const DeleteRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const request = await collections.requests?.findOne({ _id: new ObjectId(id) }) as Requests
        const user = await collections.users?.findOne({ _id: new ObjectId(request.userId)}) as User
        await DeleteRequesttEmail(user.email, request.title)
        await collections.requests?.deleteOne({ _id: new ObjectId(id) })
        res.status(200).send({ message: 'Pedido deletado com sucesso!' })    
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}