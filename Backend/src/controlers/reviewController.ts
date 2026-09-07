import type { Response, Request } from "express";
import type UserAuthRequest from "../Interfaces/utils.js";
import { collections } from "../services/databaseService.js";
import type { Review } from "../Interfaces/collectionsInterfaces.js";
import { ObjectId } from "mongodb";

export const GetMovieReviews = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        const movieReviews = await collections.reviews?.find({ movieId: new ObjectId(movieId) }).toArray() as Review[]
        res.status(200).send(movieReviews)
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const GetUserReviews = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user;
        const userReviews = await collections.reviews?.find({ userId: new ObjectId(userId) }).toArray() as Review[]
        res.status(200).send(userReviews)    
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const AddReview =  async (req: Request, res: Response) => {
    try {
        const { title, userId, movieId, text, rating } = req.body
        await collections.reviews?.insertOne({ 
            title,
            userId: new ObjectId(userId),
            movieId,
            text,
            rating,
            likes: 0
        })
        res.status(200).send({ message: 'Review Adicionada com sucesso!' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const EditReview =  async (req: Request, res: Response) => {
    try {
        const { title, text, rating, reviewId } = req.body
        await collections.reviews?.updateOne({ _id: new ObjectId(reviewId) }, {
            $set: { 
            title,
            text,
            rating,
            likes: 0
        }
        }
        )
        res.status(200).send({ message: 'Review Modificada com sucesso!' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}

export const DeleteReview =  async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.body
        await collections.reviews?.deleteOne({ _id: new ObjectId(reviewId)})
        res.status(200).send({ message: 'Review Deletada com sucesso!' })
    } catch (error: unknown) {
        res.status(500).send(error);
    }
}