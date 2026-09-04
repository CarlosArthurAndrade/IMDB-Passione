import type { Request, Response } from "express";
import { collections } from "../services/databaseService.js";
import type { Movie } from "../Interfaces/collectionsInterfaces.js";
import { getMovieDataById, getMovieId } from "../utils/tmdbRequests.js";
import { ObjectId } from "mongodb";

export const ListMovies = async (_req: Request, res: Response) => {
    try {
        const moviesList = await collections.movies?.find().toArray() as Movie[]
        res.status(200).send(moviesList)
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const AddMovie = async (req: Request, res: Response) => {
    try {
        const { title, poster, year } = req.body
        const MovieId = await getMovieId(title, year)
        const MovieDetails = await getMovieDataById(MovieId!)
        await collections.movies?.insertOne(
            {
                title: MovieDetails!.title, 
                overview: MovieDetails!.overview,
                posterHorizontal: poster,
                posterVertical: `http://image.tmdb.org/t/p/w500${MovieDetails!.poster_path}`,
                genres: MovieDetails!.genres.map(genre => genre.name),
                releaseDate: new Intl.DateTimeFormat('pt-BR').format(new Date(MovieDetails!.release_date)),
                rating: 0
            })
        res.status(201).send({ message: 'Filme adicionado' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const EditMovie =  async (req: Request, res: Response) => {
    try {
        const { title, overview, posterHorizontal, posterVertical, releaseDate, genres, rating , movieId } = req.body
        await collections.movies?.updateOne({ _id: new ObjectId(movieId) },
            {
                title,
                overview,
                posterHorizontal,
                posterVertical,
                genres,
                releaseDate,
                rating
            }
        )
        res.status(200).send({ message: 'Filme modificado' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const DeleteMovie =  async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        await collections.movies?.deleteOne({ _id: new ObjectId(movieId) })
        res.status(200).send({ message: 'Filme deletado' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}