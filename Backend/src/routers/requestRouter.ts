import express, { Router } from "express";
import { GetMovieById, GetMovieList, GetSerieById, GetSeriesList } from "../controlers/request.Controller.js";

const requestRouter = Router()
requestRouter.use(express.json())

requestRouter.post('/search-movies', GetMovieList)
requestRouter.post('/search-movie-id', GetMovieById)
requestRouter.post('/search-series', GetSeriesList)
requestRouter.post('/search-serie-id', GetSerieById)

export default requestRouter