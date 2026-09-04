import 'dotenv/config'
import type { NextFunction, Request, RequestHandler, Response } from "express";
import Jwt from "jsonwebtoken";
import type UserAuthRequest from '../Interfaces/utils.js';
import { ObjectId } from 'mongodb';

const verifyLoginToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Não autenticado" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = Jwt.verify(token!, process.env.CHAVE_SECRETA_JWT!)
        if (typeof decoded === "string" || !("id" in decoded) ||  typeof decoded.id !== "string") {
            return res.status(401).send({
                message: "Token inválido"
            })
        }
        (req as UserAuthRequest).user = new ObjectId(decoded.id);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export default verifyLoginToken