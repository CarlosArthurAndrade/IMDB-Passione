import type { Response, Request } from "express";
import { getMovieDataById, getMoviesList } from "../utils/tmdbRequests.js";
import { Code } from "../enums/code.enum.js";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";

export const GetMovieList = async (req: Request, res: Response) => {
    try {
        const { movieName } = req.body
        const moviesData = await getMoviesList(movieName)
        res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Filmes encontrados', moviesData))
    } catch(error){
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}

export const GetMovieById = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        const requestedMovie = await getMovieDataById(movieId)
        res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Filme encontrado', requestedMovie))
    } catch(error){
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error));
    }
}