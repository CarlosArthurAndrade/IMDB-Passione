import type { Response, Request } from "express";
import { getMovieDataById, getMoviesList } from "../utils/tmdbRequests.js";

export const GetMovieList = async (req: Request, res: Response) => {
    try {
        const { movieName } = req.body
        const moviesData = await getMoviesList(movieName)
        res.status(200).send(moviesData)
    } catch(err){
        console.error(err)
    }
}

export const GetMovieById = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        const requestedMovie = await getMovieDataById(movieId)
        res.status(200).send(requestedMovie)
    } catch(err){
        console.error(err)
    }
}