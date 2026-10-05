import type { Request, Response } from "express";
import { collections } from "../services/databaseService.js";
import type { Serie } from "../Interfaces/collectionsInterfaces.js";
import { ObjectId } from "mongodb";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";
import { Code } from "../enums/code.enum.js";

export const ListSeries = async (_req: Request, res: Response) => {
    try {
        const seriesList = await collections.series?.find().toArray() as Serie[]
        res.status(Code.OK).send(new HttpResponse<Serie[]>(Code.OK, Status.OK, 'Usuário encontrado', seriesList))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const AddSerie = async (req: Request, res: Response) => {
    try {
        const newMSerie = req.body
        await collections.series?.insertOne(newMSerie)
        res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, "Série adicionada"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const EditSerie =  async (req: Request, res: Response) => {
    try {
        const updates = req.body

        const result = await collections.series?.updateOne(
            { _id: new ObjectId(updates.id) },
            { $set: updates }
        )

        if (!result?.matchedCount) {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Série não encontrada' ))
        }
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Série modificada"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const DeleteSerie =  async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        await collections.series?.deleteOne({ _id: new ObjectId(movieId) })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Série deletada"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}