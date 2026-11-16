"use client"
import { Movie, Review } from "@/interfaces/(main-page)/mainPageInterfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postData } from "../utils/httpRequests/httpRequests";

export default function MovieDetailsPageService() {
    const [movie, setMovie] = useState<Movie>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>()
    const id = useParams<{ id: string }>().id

    const onClose = () => {
        setOpen(false)
    }

    const fetchReviews = async () => {
    const token = window.localStorage.getItem("userId")
    const res = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/movie-reviews', { showId: id }, token!)
    setReviews(res?.data)
}

const onConfirm = async (text: string, rating: number) => {
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
        setOpen(false)
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

    return { movie, reviews, onClose, onConfirm, isOpen, setOpen }
}