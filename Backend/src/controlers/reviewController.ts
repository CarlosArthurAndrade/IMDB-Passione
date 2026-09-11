import type { Response, Request } from "express";
import type UserAuthRequest from "../Interfaces/utils.js";
import { collections } from "../services/databaseService.js";
import type { Review } from "../Interfaces/collectionsInterfaces.js";
import { ObjectId } from "mongodb";
import { Code } from "../enums/code.enum.js";
import { HttpResponse } from "../domains/httpResponse.js";
import { Status } from "../enums/status.enum.js";

export const GetMovieReviews = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body
        const movieReviews = await collections.reviews?.find({ movieId: new ObjectId(movieId) }).toArray() as Review[]
        res.status(Code.OK).send(new HttpResponse<Review[]>(Code.OK, Status.OK, 'Reviews do filme encontradas', movieReviews))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const GetUserReviews = async (req: Request, res: Response) => {
    try {
        const userId = (req as UserAuthRequest).user;
        const userReviews = await collections.reviews?.find({ userId: new ObjectId(userId) }).toArray() as Review[]
        res.status(Code.OK).send(new HttpResponse<Review[]>(Code.OK, Status.OK, 'Reviews do usuário encontradas', userReviews))   
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
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
        res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, "Review Adicionada com sucesso!"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
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
        }})
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Review Modificada com sucesso!"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}

export const DeleteReview =  async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.body
        await collections.reviews?.deleteOne({ _id: new ObjectId(reviewId)})
        res.status(Code.NO_CONTENT).send(new HttpResponse(Code.NO_CONTENT, Status.NO_CONTENT, "Review Deletada com sucesso!"))
    } catch (error: unknown) {
        res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Ocorreu um erro', error))
    }
}