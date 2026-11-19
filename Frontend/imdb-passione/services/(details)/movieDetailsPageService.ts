"use client"
import { Movie, Review } from "@/interfaces/(main-page)/mainPageInterfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteData, postData, updateData } from "../utils/httpRequests/httpRequests";

export default function MovieDetailsPageService() {
    const [movie, setMovie] = useState<Movie>()
    const [isOpenCreate, setOpenCreate] = useState<boolean>(false)
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false)
    const [initialReview, setInitialReview] = useState<string>("")
    const [initialRating, setInitialRating] = useState<number>(0)
    const [selectedReviewId, setSelectedReviewId] = useState<String>()
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>([])
    const id = useParams<{ id: string }>().id

    const fetchReviews = async () => {
        const token = window.localStorage.getItem("userId")
        const res = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/movie-reviews', { showId: id }, token!)
        setReviews(res?.data? res.data : [])
    }

    const createReview = async (text: string, rating: number) => {
        const token = window.localStorage.getItem("userId")
        const newReview = {
            showName: movie?.title,
            showId: id,
            text,
            rating,
        }
        const response = await postData('https://imdb-passione-backend.vercel.app/reviews/new-review', newReview, token!)

        if (response) {
            await fetchReviews()
            setOpenCreate(false)
        }
    }

    const deleteReview = async () => {
        const token = window.localStorage.getItem("userId")
        const response = await deleteData('https://imdb-passione-backend.vercel.app/reviews/delete-review', { reviewId: selectedReviewId }, token!)

        if(response) {
            fetchReviews()
            setOpenDelete(false)
        }
    }

    const editReview = async (text: string, rating: number) => {
        const token = window.localStorage.getItem("userId")
        const body = { text, rating, reviewId: selectedReviewId }
        const response = await updateData('https://imdb-passione-backend.vercel.app/reviews/edit-review', body, token!)

        if(response){
            fetchReviews()
            setOpenEdit(false)
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem("userId")
        const getMovie = async () => {
            const movieRes = await postData<Movie>('https://imdb-passione-backend.vercel.app/movies/movie-by-id', { id }, token!)
            setMovie(movieRes?.data)
        }
        getMovie()
        fetchReviews()
    }, [])

    return { 
        movie, 
        reviews, 
        createReview, 
        editReview, 
        deleteReview, 
        isOpenCreate,
        isOpenDelete, 
        isOpenEdit, 
        setOpenCreate, 
        setOpenEdit, 
        setOpenDelete,
        initialRating,
        initialReview,
        setInitialRating,
        setInitialReview,
        selectedReviewId,
        setSelectedReviewId
    }
}