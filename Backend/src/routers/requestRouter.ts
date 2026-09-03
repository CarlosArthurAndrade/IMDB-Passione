import express, { Router } from "express";
import { AddRequest, DeleteRequest, EditRequest, GetRequests } from "../controlers/request.Controller";

const requestRouter = Router()
requestRouter.use(express.json())

requestRouter.get('/get-requests', GetRequests)
requestRouter.post('/add-request', AddRequest)
requestRouter.put('/update-request', EditRequest)
requestRouter.delete('/delete-request', DeleteRequest)

export default requestRouter