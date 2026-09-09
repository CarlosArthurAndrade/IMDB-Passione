import express, { Router } from "express";
import { GetMovieById, GetMovieList } from "../controlers/request.Controller.js";

const requestRouter = Router()
requestRouter.use(express.json())

requestRouter.post('/search-by-name', GetMovieList)
requestRouter.post('search-by-id', GetMovieById)

export default requestRouter