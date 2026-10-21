import express, { Router } from "express";
import { AddReview, DeleteReview, EditReview, GetMovieReviews, GetSerieReviews, GetUserReviews } from "../controlers/reviewController.js";

const reviewRouter = Router()
reviewRouter.use(express.json())

reviewRouter.post('/movie-reviews', GetMovieReviews)
reviewRouter.post('/serie-reviews', GetSerieReviews)
reviewRouter.get('/user-reviews', GetUserReviews)
reviewRouter.post('/new-review', AddReview)
reviewRouter.put('edit-review', EditReview)
reviewRouter.delete('delete-review', DeleteReview)


export default reviewRouter