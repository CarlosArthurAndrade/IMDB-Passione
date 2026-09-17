import express, { Router } from "express";
import { AddSerie, DeleteSerie, EditSerie, ListSeries } from "../controlers/seriesControllet.js";

const serieRouter = Router()
serieRouter.use(express.json())

serieRouter.get('/list', ListSeries)
serieRouter.post('/new-serie', AddSerie)
serieRouter.put('/edit-serie', EditSerie)
serieRouter.delete('/delete-serie', DeleteSerie)

export default serieRouter