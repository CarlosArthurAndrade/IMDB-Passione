import type { NextFunction, Request, Response } from "express";
import { connectToDatabase } from "../services/databaseService.js";

const connectToDatabaseMiddleware = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        console.error("Database connection failed", err);
        res.status(500).json({ error: "Database connection failed" });
    }
})

export default connectToDatabaseMiddleware;