import express, { type Request, type Response } from "express";
import cors from "cors";
import movieRouter from "./routers/movieRouter.js";
import verifyLoginToken from "./middlewares/loginTokenMiddleware.js";
import authRouter from "./routers/authRouter.js";
import reviewRouter from "./routers/reviewsRouter.js";
import requestRouter from "./routers/requestRouter.js";
import userRouter from "./routers/userRouter.js";
import { connectToDatabase } from "./services/databaseService.js";

const app = express();

app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        console.error("Database connection failed", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

app.use(cors());
app.use('/auth', authRouter);
app.use('/movies', verifyLoginToken, movieRouter);
app.use('/reviews', verifyLoginToken, reviewRouter);
app.use('/requests', verifyLoginToken, requestRouter);
app.use('/user', verifyLoginToken, userRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Backend do imdb passione rodando perfeitamente' });
});

export default app;