import express, { Router } from "express";
import { AddMovie, DeleteMovie, EditMovie, ListMovies } from "../controlers/movieController";

const movieRouter = Router()
movieRouter.use(express.json())

movieRouter.get('/list', ListMovies)
movieRouter.post('/new-movie', AddMovie)
movieRouter.put('edit-movie', EditMovie)
movieRouter.delete('/delete-movie', DeleteMovie)

export default movieRouter