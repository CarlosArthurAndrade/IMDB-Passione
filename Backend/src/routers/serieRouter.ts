import express, { Router } from "express";
import { AddSerie, DeleteSerie, EditSerie, ListSeries } from "../controlers/seriesControllet.js";

const serieRouter = Router()
serieRouter.use(express.json())

serieRouter.get('/list', ListSeries)
serieRouter.post('/new-movie', AddSerie)
serieRouter.put('/edit-movie', EditSerie)
serieRouter.delete('/delete-movie', DeleteSerie)

export default serieRouter