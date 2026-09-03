import express, { Router } from "express";
import { AddReview, DeleteReview, EditReview, GetMovieReviews, GetUserReviews } from "../controlers/reviewController";

const reviewRouter = Router()
reviewRouter.use(express.json())

reviewRouter.get('/movie-reviews', GetMovieReviews)
reviewRouter.get('/user-reviews', GetUserReviews)
reviewRouter.post('/new-review', AddReview)
reviewRouter.put('edit-review', EditReview)
reviewRouter.delete('delete-review', DeleteReview)


export default reviewRouter