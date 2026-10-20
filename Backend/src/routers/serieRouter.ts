import express, { Router } from "express";
import { AddSerie, DeleteSerie, EditSerie, GetSerieById, ListSeries } from "../controlers/seriesController.js";

const serieRouter = Router()
serieRouter.use(express.json())

serieRouter.get('/list', ListSeries)
serieRouter.post('/serie-by-id', GetSerieById)
serieRouter.post('/new-serie', AddSerie)
serieRouter.put('/edit-serie', EditSerie)
serieRouter.delete('/delete-serie', DeleteSerie)

export default serieRouter