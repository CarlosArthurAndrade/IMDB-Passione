import express, { type Request, type Response } from "express";
import { connectToDatabase } from "./services/databaseService.js";
import * as dotenv from 'dotenv'
import cors from 'cors'
import movieRouter from "./routers/movieRouter.js";
import verifyLoginToken from "./middlewares/loginTokenMiddleware.js";
import authRouter from "./routers/authRouter.js";
import reviewRouter from "./routers/reviewsRouter.js";
import requestRouter from "./routers/requestRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config({ quiet: true });

const app = express()
const PORT = process.env.PORT

async function start() {
    try {
        await connectToDatabase()

        app.use(cors());
        app.use('/auth', authRouter);
        app.use('/movies', verifyLoginToken, movieRouter)
        app.use('/reviews', verifyLoginToken, reviewRouter)
        app.use('/requests', verifyLoginToken, requestRouter)
        app.use('/user', verifyLoginToken, userRouter)

        app.get('/', (req: Request, res: Response) => {
            res.status(200).send({ message: 'Backend do imdb passione rodando perfeitamente' })
        })

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch(err) {
        console.error("Database connection failed", err);
    }
}

start()
export default app