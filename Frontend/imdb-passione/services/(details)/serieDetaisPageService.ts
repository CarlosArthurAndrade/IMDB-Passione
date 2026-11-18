"use client"
import { Serie, Review } from "@/interfaces/(main-page)/mainPageInterfaces"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { postData } from "../utils/httpRequests/httpRequests"

export default function SerieDetailsPageService() {
    const [serie, setSerie] = useState<Serie>()
    const [isOpen, setOpen] = useState<boolean>(false)
    const [reviews, setReviews] = useState<Review[]>()
    const id = useParams<{ id: string }>().id

    const onClose = () => {
        setOpen(false)
    }
    
    const fetchReviews = async () => {
        const token = window.localStorage.getItem("userId")
        const res = await postData<Review[]>('https://imdb-passione-backend.vercel.app/reviews/serie-reviews', { showId: id }, token!)
        setReviews(res?.data? res.data : [])
    }

    const onConfirm = async (text: string, rating: number) => {
        const token = window.localStorage.getItem("userId")
        const newReview = {
            showName: serie?.name,
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

    const handleEdit = (od: string, body: {}) => {
    }

    const handleDelete = (id: string) => {
    }

    useEffect(() => {
        const token = window.localStorage.getItem("userId")
        const getMovie = async () => {
            const movieRes = await postData<Serie>('https://imdb-passione-backend.vercel.app/movies/movie-by-id', { id }, token!)
            setSerie(movieRes?.data)
        }
        getMovie()
        fetchReviews()
    }, [])

    return { serie, reviews, isOpen, onClose, onConfirm, setOpen }
}