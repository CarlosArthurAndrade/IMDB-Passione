import express, { Router } from "express";
import { AddMovie, DeleteMovie, EditMovie, GetMovieById, ListMovies } from "../controlers/movieController.js";

const movieRouter = Router()
movieRouter.use(express.json())

movieRouter.get('/list', ListMovies)
movieRouter.post('/movie-by-id', GetMovieById)
movieRouter.post('/new-movie', AddMovie)
movieRouter.put('/edit-movie', EditMovie)
movieRouter.delete('/delete-movie', DeleteMovie)

export default movieRouter