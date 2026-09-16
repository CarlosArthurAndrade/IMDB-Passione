import type { Request, Response } from "express";
import { collections } from "../services/databaseService.js";
import type { Movie } from "../Interfaces/collectionsInterfaces.js";
import { ObjectId } from "mongodb";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";
import { Code } from "../enums/code.enum.js";

export const ListMovies = async (_req: Request, res: Response) => {
    try {
        const moviesList = await collections.movies?.find().toArray() as Movie[]
        res.status(Code.OK).send(new HttpResponse<Movie[]>(Code.OK, Status.OK, 'Usuário encontrado', moviesList))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const AddMovie = async (req: Request, res: Response) => {
    try {
        const newMovie = req.body
        await collections.movies?.insertOne(newMovie)
        res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, "Filme adicionado"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const EditMovie =  async (req: Request, res: Response) => {
    try {
        const updates = req.body
        const result = await collections.movies?.updateOne(
            { _id: new ObjectId(updates.movieId) },
            { $set: updates}
        )

        if (!result?.matchedCount) {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Filme não encontrado' ))
        }
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Filme modificado"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const DeleteMovie =  async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        await collections.movies?.deleteOne({ _id: new ObjectId(movieId) })
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Filme deletado"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}