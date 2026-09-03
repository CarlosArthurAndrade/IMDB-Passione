import express, { type Request, type Response } from "express";
import { connectToDatabase } from "./services/databaseService.ts";
import * as dotenv from 'dotenv'
import cors from 'cors'
import movieRouter from "./routers/movieRouter.ts";
import verifyLoginToken from "./middlewares/loginTokenMiddleware.ts";
import authRouter from "./routers/authRouter.ts";
import reviewRouter from "./routers/reviewsRouter.ts";
import requestRouter from "./routers/requestRouter.ts";
import userRouter from "./routers/userRouter.ts";

dotenv.config({ quiet: true });

const app = express()
const PORT = process.env.PORT

connectToDatabase()
    .then(() => {
        app.use(cors());
        app.use('/auth', authRouter);
        app.use('/movies', verifyLoginToken, movieRouter)
        app.use('/reviws', verifyLoginToken, reviewRouter)
        app.use('/requests', verifyLoginToken, requestRouter)
        app.use('/user', verifyLoginToken, userRouter)

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });