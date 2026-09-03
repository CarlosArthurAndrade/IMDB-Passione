import { Request, Response } from "express";
import { collections } from "../services/databaseService";
import { Movie } from "../Interfaces/collectionsInterfaces";
import { getMovieDataById, getMovieId } from "../utils/tmdbRequests";
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
        if(!title || !poster || !year) {
            return res.status(400).send({ message: 'Dados de request inválidos' })
        }
        const MovieId = await getMovieId(title, year)
        const MovieDetails = await getMovieDataById(MovieId)
        await collections.movies?.insertOne(
            {
                title: MovieDetails.title, 
                overview: MovieDetails.overview,
                posterHorizontal: poster,
                posterVertical: `http://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`,
                genres: MovieDetails.genres.map(genre => genre.name),
                releaseDate: new Intl.DateTimeFormat('pt-BR').format(new Date(MovieDetails.release_date)),
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
        await collections.movies?.updateOne({ _id: movieId },
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